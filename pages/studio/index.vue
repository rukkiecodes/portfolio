<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'studio', middleware: 'studio-auth' })

interface Media {
  url: string
  alt?: string
}
interface Target {
  platform: string
  status: string
  external_url?: string
}
interface Post {
  id?: string
  body: string
  media: Media[]
  status?: string
  created_at?: string
  post_targets?: Target[]
}
interface Topic {
  title: string
  description?: string
}
interface WorkProject {
  slug: string
  title: string
  tagline?: string
  summary?: string
  body?: string
}
interface Tone {
  label: string
  hint: string
}
interface Length {
  label: string
  hint: string
  instruction: string
}
interface Seed {
  kind: 'trend' | 'project'
  title: string
  context: string
}

const { signOut, apiFetch } = useStudioAuth()

const LINKEDIN_LIMIT = 3000

const posts = ref<Post[]>([])
const current = ref<Post>({ body: '', media: [] })
const aiPrompt = ref('')

const busy = ref<'' | 'text' | 'upload' | 'save' | 'publish'>('')
const message = ref('')
const error = ref('')
const publishedUrl = ref('')
const showDrafts = ref(false)

const linkedin = ref<{ connected: boolean; displayName?: string; expiresAt?: string }>({
  connected: false,
})

// Sources → tone → length → story
const trending = ref<Topic[]>([])
const trendingBusy = ref(false)
const work = ref<WorkProject[]>([])
const seed = ref<Seed | null>(null)
const seedTone = ref<Tone | null>(null)
const seedLength = ref<Length | null>(null)
// "Make it yours" details
const detailAudience = ref('')
const detailGoal = ref('')
const detailHook = ref('')
const detailAngle = ref('')
const detailLinks = ref('')
const detailExtra = ref('')

const TONES: Tone[] = [
  { label: 'Professional', hint: 'polished, credible, industry-savvy' },
  { label: 'Casual', hint: 'friendly, conversational, human' },
  { label: 'Goofy', hint: 'playful, funny, self-aware' },
  { label: 'Rage bait', hint: 'provocative, bold, contrarian hot-take' },
  { label: 'Inspirational', hint: 'uplifting, motivational' },
  { label: 'Storytelling', hint: 'a personal narrative or anecdote' },
]
const LENGTHS: Length[] = [
  { label: 'Short', hint: '1–2 punchy sentences', instruction: 'Keep it very short: 1–2 sentences, under 300 characters.' },
  { label: 'Medium', hint: 'a few short paragraphs', instruction: 'Medium length: 2–3 short paragraphs, roughly 600–900 characters.' },
  { label: 'Long', hint: 'a detailed post', instruction: 'A longer, detailed post: several paragraphs, roughly 1500–2200 characters, under 2800.' },
]

const overLimit = computed(() => current.value.body.length > LINKEDIN_LIMIT)
const canPublish = computed(
  () => linkedin.value.connected && !overLimit.value && (!!current.value.body || current.value.media.length > 0)
)

function notify(msg: string) {
  message.value = msg
  error.value = ''
  setTimeout(() => (message.value = ''), 2500)
}
function fail(e: unknown) {
  error.value =
    (e as { data?: { error?: string } })?.data?.error ||
    (e as { message?: string })?.message ||
    'Something went wrong'
}

/* ------------------------------ data ------------------------------ */

async function loadPosts() {
  try {
    posts.value = await apiFetch<Post[]>('/api/admin/posts')
  } catch (e) {
    fail(e)
  }
}
async function loadProjects() {
  try {
    work.value = await apiFetch<WorkProject[]>('/api/projects')
  } catch {
    /* ignore */
  }
}
async function loadLinkedIn() {
  try {
    linkedin.value = await apiFetch('/api/admin/linkedin/status')
    if (linkedin.value.connected && !trending.value.length) loadTrending()
  } catch {
    /* not connected */
  }
}
async function loadTrending() {
  trendingBusy.value = true
  try {
    const { topics } = await apiFetch<{ topics: Topic[] }>('/api/admin/ai/trending')
    trending.value = topics || []
  } catch (e) {
    fail(e)
  } finally {
    trendingBusy.value = false
  }
}

/* --------------------------- source wizard --------------------------- */

function resetWizard() {
  seedTone.value = null
  seedLength.value = null
  detailAudience.value = ''
  detailGoal.value = ''
  detailHook.value = ''
  detailAngle.value = ''
  detailLinks.value = ''
  detailExtra.value = ''
}
function pickTopic(t: Topic) {
  seed.value = { kind: 'trend', title: t.title, context: t.description || '' }
  resetWizard()
  error.value = ''
}
function pickProject(p: WorkProject) {
  const context = [p.tagline, p.summary, (p.body || '').slice(0, 2500)].filter(Boolean).join('\n\n')
  seed.value = { kind: 'project', title: p.title, context }
  resetWizard()
  error.value = ''
}
function chooseTone(tone: Tone) {
  seedTone.value = tone
}
function chooseLength(len: Length) {
  // advance to the "make it yours" step instead of generating immediately
  seedLength.value = len
}
function cancelWizard() {
  seed.value = null
  resetWizard()
}

async function generateFromWizard() {
  const s = seed.value
  const tone = seedTone.value
  const len = seedLength.value
  if (!s || !tone || !len) return
  busy.value = 'text'
  error.value = ''
  try {
    const base =
      s.kind === 'project'
        ? `Write a LinkedIn post about a project I built called "${s.title}". Here is the full context about it:\n\n${s.context}\n\nWrite it in first person as the builder — what it does, the problem it solves, and why it's worth checking out. Do not invent facts beyond the context.`
        : `Write a LinkedIn post about this trending topic: "${s.title}". Context: ${s.context}. Make it a compelling, first-person take.`

    const extras: string[] = []
    if (detailAudience.value) extras.push(`Write it for this audience: ${detailAudience.value}.`)
    if (detailGoal.value) extras.push(`The goal of this post is to ${detailGoal.value.toLowerCase()}.`)
    if (detailHook.value) extras.push(`Open the post with ${detailHook.value.toLowerCase()}.`)
    if (detailAngle.value.trim())
      extras.push(`How I want it phrased (my voice and angle — follow this closely): ${detailAngle.value.trim()}`)
    if (detailExtra.value.trim())
      extras.push(`Also weave in these points/details naturally: ${detailExtra.value.trim()}`)
    if (detailLinks.value.trim())
      extras.push(
        `Include these links, each on its own line so LinkedIn shows a preview: ${detailLinks.value.trim()}`
      )

    const prompt = [base, ...extras].join('\n\n') + '\n\nMake it ready to publish.'

    const { text } = await apiFetch<{ text: string }>('/api/admin/ai/generate-text', {
      method: 'POST',
      body: {
        prompt,
        system: `You are a senior software developer's social media manager, writing a LinkedIn post people actually stop to read. Tone: ${tone.label} — ${tone.hint}. Length: ${len.instruction} Open with a strong, scroll-stopping hook on the first line. Use short lines and white space for readability. Be authentic and first person — never generic or corporate-boring. Preserve any links given, on their own line. No hashtags unless natural.`,
      },
    })
    current.value = { body: text, media: [] }
    publishedUrl.value = ''
    cancelWizard()
    notify('Post written')
  } catch (e) {
    fail(e)
  } finally {
    busy.value = ''
  }
}

/* ---------------------------- composing ---------------------------- */

function newPost() {
  current.value = { body: '', media: [] }
  publishedUrl.value = ''
  error.value = ''
  showDrafts.value = false
}
function selectPost(p: Post) {
  current.value = { id: p.id, body: p.body, media: [...(p.media || [])], status: p.status }
  publishedUrl.value = ''
  error.value = ''
  showDrafts.value = false
}
async function generateText() {
  if (!aiPrompt.value.trim()) return
  busy.value = 'text'
  error.value = ''
  try {
    const { text } = await apiFetch<{ text: string }>('/api/admin/ai/generate-text', {
      method: 'POST',
      body: {
        prompt: aiPrompt.value,
        system:
          'You write concise, engaging LinkedIn posts for a senior software developer. Professional but human. No hashtags unless asked. Keep under 3000 characters.',
      },
    })
    current.value.body = text
    notify('Generated')
  } catch (e) {
    fail(e)
  } finally {
    busy.value = ''
  }
}

/* ------------------------------ media ------------------------------ */

function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = async () => {
    busy.value = 'upload'
    error.value = ''
    try {
      const media = await apiFetch<Media>('/api/admin/uploads', {
        method: 'POST',
        body: { dataUrl: reader.result, alt: file.name },
      })
      current.value.media.push(media)
      notify('Image added')
    } catch (err) {
      fail(err)
    } finally {
      busy.value = ''
    }
  }
  reader.readAsDataURL(file)
}
function removeMedia(i: number) {
  current.value.media.splice(i, 1)
}

/* --------------------------- save / publish --------------------------- */

async function persist(): Promise<Post> {
  const payload = { body: current.value.body, media: current.value.media }
  const saved = current.value.id
    ? await apiFetch<Post>(`/api/admin/posts/${current.value.id}`, { method: 'PATCH', body: payload })
    : await apiFetch<Post>('/api/admin/posts', { method: 'POST', body: payload })
  current.value = { id: saved.id, body: saved.body, media: saved.media || [], status: saved.status }
  return saved
}
async function saveDraft() {
  busy.value = 'save'
  error.value = ''
  try {
    await persist()
    await loadPosts()
    notify('Draft saved')
  } catch (e) {
    fail(e)
  } finally {
    busy.value = ''
  }
}
async function publish() {
  if (!linkedin.value.connected) {
    error.value = 'Connect LinkedIn first'
    return
  }
  busy.value = 'publish'
  error.value = ''
  publishedUrl.value = ''
  try {
    await persist()
    const { results } = await apiFetch<{ results: { platform: string; status: string; url?: string; error?: string }[] }>(
      `/api/admin/posts/${current.value.id}/publish`,
      { method: 'POST', body: { platforms: ['linkedin'] } }
    )
    const li = results.find(r => r.platform === 'linkedin')
    if (li?.status === 'published') {
      publishedUrl.value = li.url || ''
      notify('Published to LinkedIn')
    } else {
      error.value = `LinkedIn: ${li?.error || 'publish failed'}`
    }
    await loadPosts()
  } catch (e) {
    fail(e)
  } finally {
    busy.value = ''
  }
}
function isPublished(p: Post): boolean {
  return (p.post_targets || []).some(t => t.platform === 'linkedin' && t.status === 'published')
}

/* --------------------------- connection --------------------------- */

async function connectLinkedIn() {
  try {
    const { url } = await apiFetch<{ url: string }>(
      `/api/admin/linkedin/connect?return=${encodeURIComponent(window.location.origin)}`
    )
    window.location.href = url
  } catch (e) {
    fail(e)
  }
}
async function disconnectLinkedIn() {
  try {
    await apiFetch('/api/admin/linkedin/disconnect', { method: 'POST' })
    await loadLinkedIn()
    trending.value = []
    notify('LinkedIn disconnected')
  } catch (e) {
    fail(e)
  }
}
async function logout() {
  await signOut()
  await navigateTo('/studio/login')
}

onMounted(() => {
  loadPosts()
  loadProjects()
  loadLinkedIn()
  const route = useRoute()
  if (route.query.linkedin === 'connected') notify('LinkedIn connected')
  else if (route.query.linkedin === 'error') error.value = `LinkedIn: ${route.query.msg || 'connection failed'}`
})
</script>

<template>
  <div class="app">
    <header class="top">
      <div class="top__brand"><span class="top__logo">✦</span><span>Studio</span></div>
      <div class="top__right">
        <span v-if="message" class="top__msg">{{ message }}</span>
        <button class="icon-btn" title="Sign out" @click="logout">⏻</button>
      </div>
    </header>

    <main class="main">
      <div class="content">
        <!-- connection -->
        <div class="conn" :data-connected="linkedin.connected">
          <span class="conn__badge">in</span>
          <template v-if="linkedin.connected">
            <span class="conn__text"><b>Connected</b><template v-if="linkedin.displayName"> · {{ linkedin.displayName }}</template></span>
            <button class="btn btn--ghost btn--sm" @click="disconnectLinkedIn">Disconnect</button>
          </template>
          <template v-else>
            <span class="conn__text">Not connected</span>
            <button class="btn btn--li btn--sm" @click="connectLinkedIn">Connect LinkedIn</button>
          </template>
        </div>

        <!-- wizard (a source is selected) -->
        <section v-if="seed" class="card wiz-card">
          <p class="wiz__crumb">
            <span class="tag">{{ seed.kind === 'project' ? 'Your project' : 'Trending' }}</span>
            <b>{{ seed.title }}</b>
          </p>
          <p v-if="busy === 'text'" class="wiz__loading">Writing your post…</p>

          <!-- step 3: make it yours -->
          <template v-else-if="seedTone && seedLength">
            <p class="wiz__q">Make it yours ✨ <span class="muted">— all optional</span></p>

            <div class="wiz__selects">
              <label class="sel">
                <span>Audience</span>
                <select v-model="detailAudience" class="field">
                  <option value="">Anyone</option>
                  <option>Founders &amp; startups</option>
                  <option>Developers</option>
                  <option>Recruiters</option>
                  <option>Potential clients</option>
                  <option>Investors</option>
                </select>
              </label>
              <label class="sel">
                <span>Goal</span>
                <select v-model="detailGoal" class="field">
                  <option value="">Just share</option>
                  <option>build authority</option>
                  <option>drive signups</option>
                  <option>get clients</option>
                  <option>start a debate</option>
                  <option>attract hires</option>
                </select>
              </label>
              <label class="sel">
                <span>Hook</span>
                <select v-model="detailHook" class="field">
                  <option value="">Auto</option>
                  <option>a question</option>
                  <option>a bold claim</option>
                  <option>a personal story</option>
                  <option>a surprising stat</option>
                </select>
              </label>
            </div>

            <label class="wiz__label">How should it be phrased? Your voice, angle, key points</label>
            <textarea
              v-model="detailAngle"
              class="field field--area"
              rows="2"
              placeholder="e.g. punchy and first-person; focus on the offline feature; end with a question"
            />

            <label class="wiz__label">Links to add (video, demo, article)</label>
            <input v-model="detailLinks" class="field" placeholder="https://…  (one per line)" />

            <label class="wiz__label">Anything else to mention? (stats, a story, a call to action)</label>
            <textarea
              v-model="detailExtra"
              class="field field--area"
              rows="2"
              placeholder="e.g. 2,000+ on the waitlist; ask readers to DM for early access"
            />

            <div class="wiz__actions">
              <button class="btn btn--primary btn--wide" @click="generateFromWizard">Write it ✨</button>
              <button class="wiz__back" @click="seedLength = null">← length</button>
            </div>
          </template>

          <!-- step 2: length -->
          <template v-else-if="seedTone">
            <p class="wiz__q">How long should it be?</p>
            <div class="chips">
              <button v-for="l in LENGTHS" :key="l.label" class="chip chip--go" @click="chooseLength(l)">
                <b>{{ l.label }}</b><small>{{ l.hint }}</small>
              </button>
            </div>
            <button class="wiz__back" @click="seedTone = null">← tone</button>
          </template>

          <!-- step 1: tone -->
          <template v-else>
            <p class="wiz__q">How should it sound?</p>
            <div class="chips">
              <button v-for="t in TONES" :key="t.label" class="chip chip--go" :title="t.hint" @click="chooseTone(t)">
                {{ t.label }}
              </button>
            </div>
            <button class="wiz__back" @click="cancelWizard">← back</button>
          </template>
        </section>

        <!-- sources (no seed selected) -->
        <template v-else>
          <!-- your work -->
          <section v-if="work.length" class="card">
            <div class="card__head"><h2>📦 Write about your work</h2></div>
            <div class="chips chips--scroll">
              <button v-for="p in work" :key="p.slug" class="chip" :title="p.tagline" @click="pickProject(p)">
                {{ p.title }}
              </button>
            </div>
          </section>

          <!-- trending (connected only) -->
          <section v-if="linkedin.connected" class="card trend">
            <div class="card__head">
              <h2>✨ Trending on LinkedIn</h2>
              <button class="btn btn--ghost btn--sm" :disabled="trendingBusy" @click="loadTrending">
                {{ trendingBusy ? '…' : 'Refresh' }}
              </button>
            </div>
            <div class="chips chips--scroll">
              <p v-if="trendingBusy && !trending.length" class="muted">Finding what's trending…</p>
              <button v-for="t in trending" :key="t.title" class="chip" :title="t.description" @click="pickTopic(t)">
                {{ t.title }}
              </button>
            </div>
          </section>
        </template>

        <!-- composer -->
        <section class="card composer">
          <div class="card__head">
            <h2>{{ current.id ? 'Edit post' : 'New post' }}</h2>
            <button class="btn btn--ghost btn--sm" @click="newPost">+ New</button>
          </div>

          <div class="ai-row">
            <input
              v-model="aiPrompt"
              class="field"
              placeholder="Ask Gemini to write it…"
              @keydown.enter="generateText"
            />
            <button class="btn btn--primary" :disabled="busy === 'text'" @click="generateText">
              {{ busy === 'text' ? 'Writing…' : 'Write with AI' }}
            </button>
          </div>

          <textarea v-model="current.body" class="body" rows="9" placeholder="Write your post…" />
          <div class="meta-row">
            <label class="btn btn--ghost btn--sm add-img">
              {{ busy === 'upload' ? 'Uploading…' : '＋ Image' }}
              <input type="file" accept="image/*" hidden @change="onFile" />
            </label>
            <span class="count" :class="{ over: overLimit }">{{ current.body.length }} / {{ LINKEDIN_LIMIT }}</span>
          </div>

          <div v-if="current.media.length" class="thumbs">
            <div v-for="(m, i) in current.media" :key="m.url" class="thumb">
              <img :src="m.url" :alt="m.alt || ''" />
              <button class="thumb__x" @click="removeMedia(i)">×</button>
            </div>
          </div>

          <p v-if="error" class="error">{{ error }}</p>
          <a v-if="publishedUrl" class="pub-link" :href="publishedUrl" target="_blank" rel="noreferrer">
            ✓ View on LinkedIn ↗
          </a>

          <div class="actions">
            <button class="btn btn--ghost" :disabled="busy === 'save'" @click="saveDraft">
              {{ busy === 'save' ? 'Saving…' : current.id ? 'Update draft' : 'Save draft' }}
            </button>
            <button
              class="btn btn--li"
              :disabled="busy === 'publish' || !canPublish"
              :title="!linkedin.connected ? 'Connect LinkedIn first' : ''"
              @click="publish"
            >
              {{ busy === 'publish' ? 'Publishing…' : 'Publish to LinkedIn' }}
            </button>
          </div>
        </section>
      </div>

      <!-- drafts -->
      <aside class="card drafts">
        <button class="drafts__toggle" @click="showDrafts = !showDrafts">
          <span>Posts ({{ posts.length }})</span>
          <span class="drafts__caret">{{ showDrafts ? '▲' : '▼' }}</span>
        </button>
        <ul v-show="showDrafts" class="drafts__list">
          <li v-if="!posts.length" class="muted drafts__empty">No posts yet.</li>
          <li v-for="p in posts" :key="p.id" class="draft" :class="{ active: p.id === current.id }">
            <button class="draft__open" @click="selectPost(p)">
              <span class="draft__body">{{ p.body || '(empty)' }}</span>
              <span class="draft__meta">{{ p.status }}<template v-if="isPublished(p)"> · LinkedIn ✓</template></span>
            </button>
          </li>
        </ul>
      </aside>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.top {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(var(--fui-theme-surface), 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(var(--fui-theme-on-surface), 0.1);
}
.top__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.05rem;
}
.top__logo {
  color: rgb(var(--fui-theme-primary));
}
.top__right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.top__msg {
  font-size: 0.8rem;
  color: rgb(var(--fui-theme-success, 40 190 120));
}
.icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.15);
  background: transparent;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
}

.main {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

.conn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(var(--fui-theme-on-surface), 0.05);
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
  font-size: 0.86rem;
}
.conn__badge {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #0a66c2;
  color: #fff;
  font-weight: 700;
  font-size: 0.78rem;
}
.conn__text {
  flex: 1;
  color: rgba(var(--fui-theme-on-surface), 0.7);
}
.conn[data-connected='true'] .conn__text b {
  color: rgb(var(--fui-theme-success, 40 190 120));
}

.card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(var(--fui-theme-surface), 0.7);
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.09);
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.card__head h2 {
  margin: 0;
  font-size: 1rem;
}
.trend {
  background: linear-gradient(135deg, rgba(var(--fui-theme-primary), 0.1), rgba(var(--fui-theme-surface), 0.7));
  border-color: rgba(var(--fui-theme-primary), 0.2);
}

/* wizard */
.wiz-card {
  border-color: rgba(var(--fui-theme-primary), 0.35);
}
.wiz__crumb {
  margin: 0 0 14px;
  font-size: 0.95rem;
}
.tag {
  display: inline-block;
  margin-right: 8px;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(var(--fui-theme-primary), 0.18);
  color: rgb(var(--fui-theme-primary));
}
.wiz__q {
  margin: 0 0 12px;
  font-size: 0.92rem;
  font-weight: 600;
}
.wiz__back {
  margin-top: 12px;
  background: none;
  border: none;
  color: rgba(var(--fui-theme-on-surface), 0.55);
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0;
}
.wiz__loading {
  margin: 6px 0;
  color: rgb(var(--fui-theme-primary));
  font-size: 0.9rem;
}
.wiz__label {
  display: block;
  margin: 12px 0 5px;
  font-size: 0.8rem;
  color: rgba(var(--fui-theme-on-surface), 0.7);
}
.wiz__selects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 4px;
}
@media (max-width: 480px) {
  .wiz__selects {
    grid-template-columns: 1fr;
  }
}
.sel span {
  display: block;
  font-size: 0.75rem;
  margin-bottom: 4px;
  color: rgba(var(--fui-theme-on-surface), 0.6);
}
.sel select.field {
  width: 100%;
  cursor: pointer;
}
.sel select.field option {
  color: initial;
}
.field--area {
  width: 100%;
  resize: vertical;
  line-height: 1.5;
  font-family: inherit;
}
.wiz__actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 16px;
}
.btn--wide {
  flex: 0 0 auto;
  padding: 11px 24px;
}

/* chips */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chips--scroll {
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}
.chips--scroll::-webkit-scrollbar {
  height: 5px;
}
.chip {
  flex: 0 0 auto;
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.16);
  background: rgba(var(--fui-theme-surface), 0.7);
  color: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;
}
.chip:hover {
  border-color: rgb(var(--fui-theme-primary));
}
.chip--go {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: normal;
  gap: 2px;
  background: rgba(var(--fui-theme-primary), 0.12);
  border-color: rgba(var(--fui-theme-primary), 0.35);
}
.chip--go small {
  font-size: 0.72rem;
  opacity: 0.7;
}

/* composer */
.ai-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.field {
  flex: 1;
  min-width: 180px;
  padding: 11px 13px;
  border-radius: 10px;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.18);
  background: rgba(var(--fui-theme-on-surface), 0.04);
  color: inherit;
  font-size: 0.9rem;
}
.field:focus {
  outline: none;
  border-color: rgb(var(--fui-theme-primary));
}
.body {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.18);
  background: rgba(var(--fui-theme-on-surface), 0.04);
  color: inherit;
  font: inherit;
  font-size: 1rem;
  line-height: 1.55;
  resize: vertical;
  min-height: 180px;
}
.body:focus {
  outline: none;
  border-color: rgb(var(--fui-theme-primary));
}
.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
}
.count {
  font-size: 0.78rem;
  color: rgba(var(--fui-theme-on-surface), 0.5);
}
.count.over {
  color: rgb(var(--fui-theme-error, 220 60 60));
}
.add-img {
  display: inline-flex;
  align-items: center;
}
.thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}
.thumb {
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.15);
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.thumb__x {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  cursor: pointer;
}
.error {
  color: rgb(var(--fui-theme-error, 220 60 60));
  font-size: 0.85rem;
  margin: 12px 0 0;
}
.pub-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #0a66c2;
  text-decoration: none;
}
.actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

/* drafts */
.drafts__toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  color: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}
.drafts__list {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.draft {
  border-radius: 10px;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.1);
}
.draft.active {
  border-color: rgb(var(--fui-theme-primary));
}
.draft__open {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: inherit;
  padding: 11px 13px;
  cursor: pointer;
}
.draft__body {
  display: block;
  font-size: 0.86rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.draft__meta {
  font-size: 0.72rem;
  color: rgba(var(--fui-theme-on-surface), 0.45);
}
.drafts__empty {
  list-style: none;
}
.muted {
  color: rgba(var(--fui-theme-on-surface), 0.45);
  font-size: 0.85rem;
}

/* buttons */
.btn {
  padding: 11px 18px;
  border-radius: 10px;
  border: 1px solid transparent;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  flex: 1;
}
.btn--sm {
  flex: 0 0 auto;
  padding: 7px 12px;
  font-size: 0.82rem;
}
.btn--primary {
  flex: 0 0 auto;
  background: rgb(var(--fui-theme-primary));
  color: #fff;
}
.btn--li {
  background: #0a66c2;
  color: #fff;
}
.btn--ghost {
  background: transparent;
  border-color: rgba(var(--fui-theme-on-surface), 0.2);
  color: inherit;
}
.btn:disabled {
  opacity: 0.5;
  cursor: default;
}

/* desktop: content + drafts sidebar */
@media (min-width: 860px) {
  .main {
    max-width: 980px;
    flex-direction: row;
    align-items: flex-start;
  }
  .content {
    flex: 1;
  }
  .drafts {
    width: 300px;
    flex: 0 0 300px;
    position: sticky;
    top: 76px;
  }
  .drafts__list {
    display: flex !important;
  }
  .drafts__caret {
    display: none;
  }
  .drafts__toggle {
    cursor: default;
  }
}
</style>
