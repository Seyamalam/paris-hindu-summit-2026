"use client"
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, @next/next/no-img-element */

import { useMutation, useQuery } from "convex/react"
import {
  ArchiveIcon,
  BarChart3Icon,
  BlocksIcon,
  CheckCircle2Icon,
  CircleDollarSignIcon,
  FileTextIcon,
  Globe2Icon,
  EyeIcon,
  EyeOffIcon,
  ImageIcon,
  InboxIcon,
  LayoutDashboardIcon,
  CalendarRangeIcon,
  Loader2Icon,
  LogOutIcon,
  SaveIcon,
  Settings2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  UserCogIcon,
  Users2Icon,
} from "lucide-react"
import { FormEvent, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { authClient } from "@/lib/auth-client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const panels = [
  ["dashboard", "Overview", LayoutDashboardIcon],
  ["team", "Team access", UserCogIcon],
  ["settings", "Site settings", Settings2Icon],
  ["content", "Page content", FileTextIcon],
  ["programme", "Programme", CalendarRangeIcon],
  ["charts", "Charts", BarChart3Icon],
  ["regional", "Regional", Globe2Icon],
  ["partners", "Partners", Users2Icon],
  ["inbox", "Forms inbox", InboxIcon],
  ["donations", "Donations", CircleDollarSignIcon],
  ["assets", "Media library", ImageIcon],
  ["audit", "Activity", ArchiveIcon],
] as const

type Panel = (typeof panels)[number][0]

const categories = [
  "overview",
  "agenda",
  "resolution",
  "strategy",
  "partnership",
  "why",
  "challenge",
  "engage",
  "speaker",
  "team",
  "advisory",
  "programme",
  "media",
  "faq",
] as const

const blankContent = {
  slug: "",
  title: "",
  eyebrow: "",
  summary: "",
  body: "",
  secondaryText: "",
  country: "",
  role: "",
  email: "",
  phone: "",
  linkLabel: "",
  linkUrl: "",
  dateLabel: "",
  timeLabel: "",
  parentSlug: "",
  order: 50,
  status: "draft" as const,
  featured: false,
}
type ContentDraft = Omit<typeof blankContent, "status"> & {
  status: "draft" | "published"
}

function AuthGate() {
  const access = useQuery(api.admin.getAccessState)
  const bootstrap = useMutation(api.admin.bootstrapFirstAdmin)
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email"))
    const password = String(data.get("password"))
    const confirmation = String(data.get("confirmPassword"))
    const name = String(data.get("name") || "Paris Assembly editor")
    if (mode === "signup" && password !== confirmation) {
      setPasswordError("The passwords do not match. Check both entries and try again.")
      toast.error("The passwords do not match.")
      return
    }
    setPasswordError("")
    setBusy(true)
    try {
      const result =
        mode === "signin"
          ? await authClient.signIn.email({ email, password })
          : await authClient.signUp.email({ email, password, name })
      if (result.error) toast.error(result.error.message)
      else toast.success(mode === "signin" ? "Signed in." : "Account created.")
    } catch {
      toast.error("Authentication could not be completed. Check your details and try again.")
    } finally {
      setBusy(false)
    }
  }

  if (access === undefined) {
    return <FullScreenStatus label="Checking secure access…" />
  }

  if (!access.signedIn) {
    return (
      <main className="admin-auth">
        <section className="admin-auth-note">
          <div className="admin-seal"><ShieldCheckIcon /></div>
          <p className="admin-kicker">Protected workspace · 2026</p>
          <h1>The public record starts behind this door.</h1>
          <p>
            Edit the summit, receive enquiries, publish regional briefings, and
            monitor donations from one controlled workspace.
          </p>
          <div className="auth-pulse"><span /> Better Auth + Convex</div>
        </section>
        <section className="admin-auth-card">
          <p className="admin-kicker">{mode === "signin" ? "Welcome back" : "Initial setup"}</p>
          <h2>{mode === "signin" ? "Sign in" : "Create editor account"}</h2>
          <form onSubmit={submit}>
            {mode === "signup" && <Field name="name" label="Your name" required />}
            <Field name="email" type="email" label="Email address" required />
            <PasswordField
              id="admin-password"
              name="password"
              label="Password"
              visible={showPassword}
              onToggle={() => setShowPassword((visible) => !visible)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              describedBy={passwordError ? "password-match-error" : undefined}
            />
            {mode === "signup" && (
              <PasswordField
                id="admin-confirm-password"
                name="confirmPassword"
                label="Retype password"
                visible={showConfirmation}
                onToggle={() => setShowConfirmation((visible) => !visible)}
                autoComplete="new-password"
                describedBy={passwordError ? "password-match-error" : undefined}
              />
            )}
            {passwordError && (
              <p className="admin-field-error" id="password-match-error" role="alert">
                {passwordError}
              </p>
            )}
            <Button disabled={busy} type="submit">
              {busy && <Loader2Icon className="animate-spin" />}
              {mode === "signin" ? "Enter control room" : "Create account"}
            </Button>
          </form>
          {access.bootstrapAvailable && (
            <button className="admin-text-button" onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin")
              setShowPassword(false)
              setShowConfirmation(false)
              setPasswordError("")
            }}>
              {mode === "signin" ? "Need the initial administrator account?" : "Already have an account? Sign in"}
            </button>
          )}
          <p className="auth-note">
            {access.bootstrapAvailable
              ? "Initial account creation is available until the first administrator is established."
              : "Public account creation is closed. An administrator must create every additional team account."}
          </p>
        </section>
      </main>
    )
  }

  if (!access.admin) {
    return (
      <main className="admin-auth">
        <section className="admin-auth-note">
          <div className="admin-seal"><ShieldCheckIcon /></div>
          <p className="admin-kicker">Identity confirmed</p>
          <h1>{access.bootstrapAvailable ? "Claim the first administrator seat." : "This account is waiting for access."}</h1>
          <p>
            {access.bootstrapAvailable
              ? "The first verified account can establish the protected editorial workspace."
              : "Ask an existing administrator to add this account as an editor."}
          </p>
        </section>
        <section className="admin-auth-card">
          {access.bootstrapAvailable ? (
            <Button onClick={async () => { await bootstrap(); toast.success("Administrator workspace created.") }}>
              <ShieldCheckIcon /> Become administrator
            </Button>
          ) : (
            <Badge variant="outline">Access pending</Badge>
          )}
          <Button variant="outline" onClick={() => authClient.signOut()}>
            <LogOutIcon /> Sign out
          </Button>
        </section>
      </main>
    )
  }

  return <Workspace admin={access.admin} />
}

function Workspace({ admin }: { admin: { name: string; email: string; role: "administrator" | "editor" } }) {
  const [panel, setPanel] = useState<Panel>("dashboard")
  return (
    <div className="admin-shell">
      <aside className="admin-rail">
        <div className="admin-wordmark">
          <span>PA</span>
          <div><b>Control room</b><small>Paris · 2026</small></div>
        </div>
        <nav>
          {panels.map(([id, label, Icon]) => (
            <button key={id} data-active={panel === id} onClick={() => setPanel(id)}>
              <Icon /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-profile">
          <b>{admin.name}</b><small>{admin.role}</small>
          <button onClick={() => authClient.signOut()}><LogOutIcon /> Sign out</button>
        </div>
      </aside>
      <main className="admin-stage">
        <header className="admin-topbar">
          <div>
            <p className="admin-kicker">Editorial control room</p>
            <h1>{panels.find(([id]) => id === panel)?.[1]}</h1>
          </div>
          <a href="/" target="_blank" rel="noreferrer">View live site ↗</a>
        </header>
        {panel === "dashboard" && <Dashboard />}
        {panel === "team" && <TeamAccessPanel canManage={admin.role === "administrator"} />}
        {panel === "settings" && <SettingsPanel />}
        {panel === "content" && <ContentPanel />}
        {panel === "programme" && <ProgrammeAdmin />}
        {panel === "charts" && <ChartsAdmin />}
        {panel === "regional" && <RegionalPanel />}
        {panel === "partners" && <PartnersPanel />}
        {panel === "inbox" && <InboxPanel />}
        {panel === "donations" && <DonationsPanel />}
        {panel === "assets" && <AssetsPanel />}
        {panel === "audit" && <AuditPanel />}
      </main>
    </div>
  )
}

function TeamAccessPanel({ canManage }: { canManage:boolean }) {
  const members = useQuery(api.admin.listTeamMembers)
  const provision = useMutation(api.admin.provisionTeamMember)
  const changeRole = useMutation(api.admin.changeAdminRole)
  const setStatus = useMutation(api.admin.setTeamMemberStatus)
  const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  async function createMember(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const password = String(data.get("password"))
    const confirmation = String(data.get("confirmPassword"))
    if (password !== confirmation) {
      setPasswordError("The passwords do not match.")
      return
    }
    setPasswordError("")
    setBusy(true)
    try {
      await provision({
        name:String(data.get("name")),
        email:String(data.get("email")),
        password,
        role:String(data.get("role")) as "administrator" | "editor",
      })
      form.reset()
      setShowPassword(false)
      setShowConfirmation(false)
      toast.success("Team account created. Share the credentials securely.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The team account could not be created.")
    } finally {
      setBusy(false)
    }
  }

  if (!members) return <PanelLoading />
  return (
    <section className="admin-panel">
      <PanelTitle
        eyebrow="Invitation-only access"
        title="Every account begins here."
        copy="Public sign-up is disabled. Administrators create named accounts, choose the role, and can suspend access immediately."
      />
      {canManage && (
        <form className="team-access-form" onSubmit={createMember}>
          <fieldset className="admin-fieldset">
            <legend>Create a team account</legend>
            <div className="admin-form-grid">
              <Field name="name" label="Full name" required />
              <Field name="email" type="email" label="Email address" required />
              <label className="admin-field">
                <span>Access role</span>
                <select name="role" defaultValue="editor">
                  <option value="editor">Editor</option>
                  <option value="administrator">Administrator</option>
                </select>
              </label>
              <div className="team-access-guidance">
                Editors manage content. Administrators can also create accounts and change access.
              </div>
              <PasswordField
                id="team-password"
                name="password"
                label="Initial password"
                visible={showPassword}
                onToggle={() => setShowPassword((visible) => !visible)}
                autoComplete="new-password"
                describedBy={passwordError ? "team-password-error" : undefined}
              />
              <PasswordField
                id="team-confirm-password"
                name="confirmPassword"
                label="Retype initial password"
                visible={showConfirmation}
                onToggle={() => setShowConfirmation((visible) => !visible)}
                autoComplete="new-password"
                describedBy={passwordError ? "team-password-error" : undefined}
              />
            </div>
            {passwordError && <p className="admin-field-error" id="team-password-error" role="alert">{passwordError}</p>}
            <Button disabled={busy} type="submit">
              {busy ? <Loader2Icon className="animate-spin" /> : <UserCogIcon />}
              Create authorised account
            </Button>
          </fieldset>
        </form>
      )}
      {!canManage && <p className="team-access-guidance">Only an administrator can create accounts or change access. Editors can review the authorised team below.</p>}
      <div className="team-access-list">
        {members.map((member) => (
          <article key={member._id} data-status={member.status}>
            <div>
              <Badge variant={member.status === "active" ? "default" : "outline"}>{member.status}</Badge>
              <h3>{member.name}</h3>
              <p>{member.email}</p>
            </div>
            <label>
              <span>Role</span>
              <select
                value={member.role}
                disabled={!canManage}
                onChange={async (event) => {
                  try {
                    await changeRole({ id:member._id, role:event.target.value as "administrator" | "editor" })
                    toast.success("Team role updated.")
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Role could not be updated.")
                  }
                }}
              >
                <option value="editor">Editor</option>
                <option value="administrator">Administrator</option>
              </select>
            </label>
            {canManage && (
              <Button
                variant={member.status === "active" ? "outline" : "default"}
                onClick={async () => {
                  try {
                    await setStatus({ id:member._id, status:member.status === "active" ? "suspended" : "active" })
                    toast.success(member.status === "active" ? "Account suspended." : "Account activated.")
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Account access could not be changed.")
                  }
                }}
              >
                {member.status === "active" ? "Suspend access" : "Restore access"}
              </Button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function Dashboard() {
  const data = useQuery(api.admin.getDashboard)
  if (!data) return <PanelLoading />
  const stats = [
    ["Content records", data.content, BlocksIcon],
    ["Form submissions", data.submissions, InboxIcon],
    ["Donation records", data.donations, CircleDollarSignIcon],
    ["Managed assets", data.assets, ImageIcon],
  ] as const
  return (
    <section className="admin-panel">
      <div className="admin-status-line"><span /> Systems connected · public site reads live Convex data</div>
      <div className="admin-stat-grid">
        {stats.map(([label, value, Icon], index) => (
          <article key={label}><Icon /><span>0{index + 1}</span><b>{value}</b><p>{label}</p></article>
        ))}
      </div>
      <PanelTitle eyebrow="Latest intake" title="Recent form submissions" />
      <div className="admin-list">
        {data.recentSubmissions.length === 0 && <EmptyCopy text="No submissions yet. The public support and contact forms are ready." />}
        {data.recentSubmissions.map((item) => (
          <div key={item._id}><Badge variant="outline">{item.type}</Badge><b>{item.name}</b><span>{item.email}</span><small>{item.status}</small></div>
        ))}
      </div>
    </section>
  )
}

function SettingsPanel() {
  const settings = useQuery(api.settings.get)
  const save = useMutation(api.settings.save)
  const [draft, setDraft] = useState<Record<string, string | boolean> | null>(null)
  useEffect(() => { if (settings) setDraft(settings) }, [settings])
  if (!draft) return <PanelLoading />
  const groups = [
    ["Identity & dates", ["eventName", "shortName", "theme", "eventStartIso", "eventEndIso", "timezone"]],
    ["Venue & scale", ["venue", "address", "cityCountry", "format", "delegateInfo", "languages"]],
    ["Contact desk", ["contactEmail", "registrationEmail", "pressEmail", "phone", "whatsapp"]],
    ["Social links", ["facebookUrl", "xUrl", "instagramUrl", "youtubeUrl"]],
    ["Hero", ["heroEyebrow", "heroTitleLine1", "heroTitleLine2", "heroLead"]],
    ["Why this summit", ["whyTitle", "whyBody"]],
    ["Donation invitation", ["donationEyebrow", "donationTitle", "donationBody"]],
    ["Footer", ["footerTitle", "footerBody"]],
    ["Announcement", ["announcement"]],
  ] as const
  return (
    <section className="admin-panel">
      <PanelTitle eyebrow="Global controls" title="Every word, number and contact point." copy="Changes publish to Convex immediately. Use the switches to control public availability." />
      <div className="admin-switches">
        {["announcementEnabled", "registrationOpen", "donationsEnabled"].map((key) => (
          <label key={key}><Switch checked={Boolean(draft[key])} onCheckedChange={(value) => setDraft({ ...draft, [key]: value })} /><span>{humanize(key)}</span></label>
        ))}
      </div>
      {groups.map(([title, keys]) => (
        <fieldset className="admin-fieldset" key={title}>
          <legend>{title}</legend>
          <div className="admin-form-grid">
            {keys.map((key) => (
              <Field key={key} label={humanize(key)} value={String(draft[key] ?? "")} multiline={/Body|Lead|announcement/i.test(key)} onValueChange={(value) => setDraft({ ...draft, [key]: value })} />
            ))}
          </div>
        </fieldset>
      ))}
      <Button className="admin-save" onClick={async () => { await save(draft as Parameters<typeof save>[0]); toast.success("Site settings published.") }}>
        <SaveIcon /> Save all settings
      </Button>
    </section>
  )
}

function ContentPanel() {
  const [category, setCategory] = useState<(typeof categories)[number]>("engage")
  const entries = useQuery(api.cms.listForAdmin, { category })
  const save = useMutation(api.cms.save)
  const remove = useMutation(api.cms.remove)
  const assets = useQuery(api.assets.list)
  const [selected, setSelected] = useState<string>("new")
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | undefined>()
  const existing = entries?.find((item) => item._id === selected)
  const [draft, setDraft] = useState<ContentDraft>({ ...blankContent })
  useEffect(() => {
    if (existing) {
      const { _id, category: _category, imageStorageId: _image, imageUrl: _url, ...fields } = existing
      setImageStorageId(_image)
      void _id; void _category; void _url
      setDraft(fields)
    } else { setDraft({ ...blankContent }); setImageStorageId(undefined) }
  }, [existing, category, selected])
  return (
    <section className="admin-panel">
      <PanelTitle eyebrow="Structured publishing" title="Build every page from reusable records." copy="Agenda, speakers, teams, FAQs, media, strategy, engagement and more share one flexible editor." />
      <div className="admin-content-layout">
        <aside className="admin-records">
          <select value={category} onChange={(event) => { setCategory(event.target.value as typeof category); setSelected("new") }}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button data-active={selected === "new"} onClick={() => setSelected("new")}><SparklesIcon /> New {category}</button>
          {entries?.map((entry) => <button data-active={selected === entry._id} key={entry._id} onClick={() => setSelected(entry._id)}><span>{entry.title}</span><small>{entry.status}</small></button>)}
        </aside>
        <div className="admin-editor">
          <div className="admin-form-grid">
            {Object.entries(draft).filter(([key]) => !["featured", "status", "order"].includes(key)).map(([key, value]) => (
              <Field key={key} label={humanize(key)} value={String(value)} multiline={["summary", "body", "secondaryText"].includes(key)} onValueChange={(next) => setDraft({ ...draft, [key]: next })} />
            ))}
            <Field label="Display order" type="number" value={String(draft.order)} onValueChange={(value) => setDraft({ ...draft, order: Number(value) })} />
            <label className="admin-field"><span>Publication status</span><select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as "draft" | "published" })}><option value="draft">Draft</option><option value="published">Published</option></select></label>
            <label className="admin-check"><Checkbox checked={draft.featured} onCheckedChange={(value) => setDraft({ ...draft, featured: Boolean(value) })} /> Featured record</label>
            <label className="admin-field"><span>Attached image or document</span><select value={imageStorageId ?? ""} onChange={(event) => setImageStorageId((event.target.value || undefined) as Id<"_storage"> | undefined)}><option value="">No attachment</option>{assets?.map((asset) => <option key={asset._id} value={asset.storageId}>{asset.fileName}</option>)}</select></label>
          </div>
          <div className="admin-editor-actions">
            <Button onClick={async () => {
              await save({ ...(existing ? { id: existing._id } : {}), category, ...draft, imageStorageId })
              toast.success("Content saved."); setSelected("new")
            }}><SaveIcon /> Save record</Button>
            {existing && <ConfirmDelete label={existing.title} onConfirm={async () => { await remove({ id: existing._id }); setSelected("new"); toast.success("Record removed.") }} />}
          </div>
        </div>
      </div>
    </section>
  )
}

function RegionalPanel() {
  const rows = useQuery(api.content.listRegionalForAdmin)
  const save = useMutation(api.content.saveRegional)
  const remove = useMutation(api.content.removeRegional)
  return <RecordCards title="Beyond Bangladesh" copy="Nepal is included. Add any country, revise its public briefing, change the order or hold it as a draft." rows={rows} fields={["slug","name","code","eyebrow","headline","summary","detail","sourceUrl","order","status"]} blank={{ slug:"",name:"",code:"",eyebrow:"",headline:"",summary:"",detail:"",sourceUrl:"",order:50,status:"draft" }} onSave={save} onRemove={remove} />
}

function PartnersPanel() {
  const rows = useQuery(api.content.listOrganizationsForAdmin)
  const save = useMutation(api.content.saveOrganization)
  const remove = useMutation(api.content.removeOrganization)
  return <RecordCards title="Partner constellation" copy="A grouped institutional wall replaces the slider. Partners and sponsors can be ordered, classified and published independently." rows={rows} fields={["slug","name","kind","tier","description","websiteUrl","order","status"]} blank={{ slug:"",name:"",kind:"partner",tier:"community",description:"",websiteUrl:"",order:50,status:"draft" }} onSave={save} onRemove={remove} />
}

function RecordCards({ title, copy, rows, fields, blank, onSave, onRemove }: { title:string; copy:string; rows: any[] | undefined; fields:string[]; blank:Record<string,any>; onSave:(args:any)=>Promise<any>; onRemove:(args:any)=>Promise<any> }) {
  const [draft, setDraft] = useState<Record<string,any>>(blank)
  const [selected, setSelected] = useState<string>("new")
  useEffect(() => { setDraft(selected === "new" ? blank : rows?.find((row) => row._id === selected) ?? blank) }, [selected, rows, blank])
  return (
    <section className="admin-panel">
      <PanelTitle eyebrow="Directory editor" title={title} copy={copy} />
      <div className="admin-record-chips">
        <button data-active={selected === "new"} onClick={() => setSelected("new")}>+ New</button>
        {rows?.map((row) => <button data-active={selected === row._id} key={row._id} onClick={() => setSelected(row._id)}>{row.name}</button>)}
      </div>
      <div className="admin-form-grid">
        {fields.map((key) => key === "status" || key === "kind" || key === "tier"
          ? <label className="admin-field" key={key}><span>{humanize(key)}</span><select value={draft[key]} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}>
              {(key === "status" ? ["draft","published"] : key === "kind" ? ["partner","sponsor"] : ["strategic","knowledge","community","supporting"]).map((value) => <option key={value}>{value}</option>)}
            </select></label>
          : <Field key={key} label={humanize(key)} type={["order","value"].includes(key) ? "number" : "text"} multiline={["summary","detail","description"].includes(key)} value={String(draft[key] ?? "")} onValueChange={(value) => setDraft({ ...draft, [key]: ["order","value"].includes(key) ? Number(value) : value })} />)}
      </div>
      <div className="admin-editor-actions">
        <Button onClick={async () => {
          const { _id, ...value } = draft
          if (!fields.includes("name")) delete value.name
          try {
            await onSave({ ...(selected === "new" ? {} : { id:_id }), ...value })
            setSelected("new")
            toast.success(`${title} updated.`)
          } catch (error) {
            toast.error(error instanceof Error ? error.message : `${title} could not be saved.`)
          }
        }}><SaveIcon /> Save</Button>
        {selected !== "new" && <ConfirmDelete label={String(draft.name ?? draft.title ?? "record")} onConfirm={async () => { await onRemove({ id:selected }); setSelected("new") }} />}
      </div>
    </section>
  )
}

function InboxPanel() {
  const rows = useQuery(api.admin.listSubmissions)
  const update = useMutation(api.admin.updateSubmission)
  return (
    <section className="admin-panel">
      <PanelTitle eyebrow="Human contact" title="Support, registration and enquiries." copy="Every public form arrives here with a reference, status and private editorial note." />
      <Button variant="outline" onClick={() => {
        if (!rows) return
        const header = ["type","firstName","lastName","email","phone","organization","subject","status","createdAt"]
        const csv = [header.join(","), ...rows.map((row) => header.map((key) => JSON.stringify(String(row[key as keyof typeof row] ?? ""))).join(","))].join("\n")
        const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type:"text/csv" })); link.download = `paris-summit-submissions-${new Date().toISOString().slice(0,10)}.csv`; link.click(); URL.revokeObjectURL(link.href)
      }}>Export CSV</Button>
      <div className="admin-inbox">
        {rows?.length === 0 && <EmptyCopy text="The inbox is quiet. Public forms are live and ready." />}
        {rows?.map((row) => <article key={row._id}>
          <header><Badge>{row.type}</Badge><span>{new Date(row.createdAt).toLocaleDateString()}</span></header>
          <h3>{row.firstName} {row.lastName}</h3><a href={`mailto:${row.email}`}>{row.email}</a>
          <p>{row.subject || row.message || "No message supplied."}</p>
          <div><select defaultValue={row.status} onChange={(event) => update({ id:row._id, status:event.target.value as any, adminNote:row.adminNote })}><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="archived">Archived</option></select></div>
        </article>)}
      </div>
    </section>
  )
}

function ProgrammeAdmin() {
  const data = useQuery(api.programme.listForAdmin)
  const saveDay = useMutation(api.programme.saveDay)
  const saveSession = useMutation(api.programme.saveSession)
  const removeDay = useMutation(api.programme.removeDay)
  const removeSession = useMutation(api.programme.removeSession)
  return <section className="admin-panel">
    <PanelTitle eyebrow="Purpose-built schedule" title="Days, sessions and public navigation." copy="Changes update the programme tabs and navigation menu without a frontend deployment." />
    <RecordCards title="Programme days" copy="Control day labels, dates, summaries, order and publication." rows={data?.days.map((row) => ({ ...row, name:row.tabLabel }))} fields={["slug","tabLabel","navigationLabel","dateLabel","summary","order","status"]} blank={{ slug:"",tabLabel:"",navigationLabel:"",dateLabel:"",summary:"",order:50,status:"draft" }} onSave={saveDay} onRemove={removeDay} />
    {data?.days.length === 0 && <EmptyCopy text="Create a programme day before adding sessions." />}
    {data?.days.map((day) => (
      <RecordCards
        key={day._id}
        title={`${day.tabLabel} sessions`}
        copy={`Only sessions assigned to ${day.tabLabel} · ${day.dateLabel} appear here. The day assignment is locked automatically.`}
        rows={data.sessions
          .filter((row) => row.daySlug === day.slug)
          .map((row) => ({ ...row, name:row.title }))}
        fields={["slug","startTime","endTime","title","description","tag","speakers","location","order","status"]}
        blank={{ daySlug:day.slug,slug:"",startTime:"",endTime:"",title:"",description:"",tag:"",speakers:"",location:"",order:50,status:"draft" }}
        onSave={(args) => saveSession({ ...args, daySlug:day.slug })}
        onRemove={removeSession}
      />
    ))}
  </section>
}

function ChartsAdmin() {
  const data = useQuery(api.charts.listForAdmin)
  const saveSeries = useMutation(api.charts.saveSeries)
  const savePoint = useMutation(api.charts.savePoint)
  const removeSeries = useMutation(api.charts.removeSeries)
  const removePoint = useMutation(api.charts.removePoint)
  return <section className="admin-panel">
    <PanelTitle eyebrow="Accessible evidence" title="Chart series, sources and numeric points." copy="Every visual chart also renders as a readable data table on the public site." />
    <RecordCards title="Chart series" copy="Titles, context, units and source citations." rows={data?.series.map((row) => ({ ...row, name:row.title }))} fields={["slug","title","eyebrow","description","sourceLabel","sourceUrl","unit","order","status"]} blank={{ slug:"",title:"",eyebrow:"",description:"",sourceLabel:"",sourceUrl:"",unit:"",order:50,status:"draft" }} onSave={saveSeries} onRemove={removeSeries} />
    <RecordCards title="Chart points" copy="Editable periods and validated non-negative numeric values." rows={data?.points.map((row) => ({ ...row, name:row.label }))} fields={["seriesSlug","label","sublabel","value","order"]} blank={{ seriesSlug:data?.series[0]?.slug ?? "population-share",label:"",sublabel:"",value:0,order:50 }} onSave={savePoint} onRemove={removePoint} />
  </section>
}

function DonationsPanel() {
  const donations = useQuery(api.admin.listDonations)
  const tiers = useQuery(api.donations.listTiersForAdmin)
  const saveTier = useMutation(api.donations.saveTier)
  const total = useMemo(() => donations?.filter((d) => d.status === "paid" || d.status === "demo").reduce((sum, d) => sum + d.amountCents, 0) ?? 0, [donations])
  return (
    <section className="admin-panel">
      <PanelTitle eyebrow="Donation readiness" title="A payment desk built for Stripe." copy="Demo contributions work now. Add Stripe keys and optional price IDs to move into live Checkout without redesigning this flow." />
      <div className="donation-total"><span>Recorded volume</span><b>€{(total / 100).toLocaleString()}</b><small>paid + demo</small></div>
      <h3 className="admin-subhead">Donation levels</h3>
      <div className="tier-grid">
        {tiers?.map((tier) => <TierEditor key={tier._id} tier={tier} onSave={saveTier} />)}
      </div>
      <h3 className="admin-subhead">Contribution ledger</h3>
      <div className="admin-list">
        {donations?.length === 0 && <EmptyCopy text="No contributions recorded yet." />}
        {donations?.map((item) => <div key={item._id}><Badge>{item.status}</Badge><b>{item.donorName || "Anonymous"}</b><span>{item.reference}</span><strong>€{(item.amountCents/100).toFixed(2)}</strong></div>)}
      </div>
    </section>
  )
}

function TierEditor({ tier, onSave }: { tier:any; onSave:(args:any)=>Promise<any> }) {
  const [draft, setDraft] = useState(tier)
  return <article>
    <div className="tier-card-top"><Badge variant="outline">{draft.status}</Badge><Switch checked={draft.status === "published"} onCheckedChange={(value) => setDraft({ ...draft, status:value ? "published" : "draft" })} /></div>
    <Field label="Tier label" value={draft.label} onValueChange={(value) => setDraft({ ...draft, label:value })} />
    {!draft.customAmount && <Field label="Euro amount" type="number" value={String((draft.amountCents ?? 0)/100)} onValueChange={(value) => setDraft({ ...draft, amountCents:Math.round(Number(value)*100) })} />}
    <Field label="Description" value={draft.description} multiline onValueChange={(value) => setDraft({ ...draft, description:value })} />
    <Field label="Stripe price ID (optional)" value={draft.stripePriceId ?? ""} onValueChange={(value) => setDraft({ ...draft, stripePriceId:value || undefined })} />
    <Button variant="outline" onClick={async () => { const { _creationTime, updatedAt, ...value } = draft; void _creationTime; void updatedAt; await onSave({ ...value, id:tier._id }); toast.success(`${draft.label} updated.`) }}><SaveIcon /> Save tier</Button>
  </article>
}

function AssetsPanel() {
  const assets = useQuery(api.assets.list)
  const uploadUrl = useMutation(api.assets.generateUploadUrl)
  const register = useMutation(api.assets.register)
  const remove = useMutation(api.assets.remove)
  const [busy, setBusy] = useState(false)
  async function upload(file: File) {
    setBusy(true)
    try {
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".pdf"]
      if (!allowedExtensions.some((extension) => file.name.toLowerCase().endsWith(extension))) {
        throw new Error("Choose a JPEG, PNG, WebP, AVIF, or PDF file.")
      }
      if (file.type.startsWith("image/")) {
        const bitmap = await createImageBitmap(file)
        if (bitmap.width < 320 || bitmap.height < 180) {
          bitmap.close()
          throw new Error("Images must be at least 320 × 180 pixels.")
        }
        bitmap.close()
      }
      const url = await uploadUrl()
      const response = await fetch(url, { method:"POST", headers:{ "Content-Type":file.type }, body:file })
      const { storageId } = await response.json()
      await register({ storageId, fileName:file.name, mimeType:file.type, byteSize:file.size, altText:file.name.replace(/\.[^.]+$/, ""), category:file.type === "application/pdf" ? "document" : "general" })
      toast.success("Asset uploaded to Convex.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.")
    } finally { setBusy(false) }
  }
  return (
    <section className="admin-panel">
      <PanelTitle eyebrow="Convex file storage" title="A single source for images and documents." copy="Upload JPEG, PNG, WebP, AVIF or PDF files up to 20 MB. Managed URLs can be attached to content records." />
      <label className="asset-drop">{busy ? <Spinner /> : <ImageIcon />}<b>{busy ? "Uploading…" : "Drop or choose an approved file"}</b><span>Images and PDF · maximum 20 MB</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif,application/pdf" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} /></label>
      <div className="asset-grid">{assets?.map((asset) => <article key={asset._id}>{asset.url && asset.mimeType.startsWith("image/") ? <img src={asset.url} alt={asset.altText} /> : <div><FileTextIcon /></div>}<b>{asset.fileName}</b><small>{(asset.byteSize/1_000_000).toFixed(1)} MB</small><button onClick={() => remove({ id:asset._id })}>Remove</button></article>)}</div>
    </section>
  )
}

function AuditPanel() {
  const rows = useQuery(api.admin.listAuditEvents)
  return <section className="admin-panel"><PanelTitle eyebrow="Accountability" title="Editorial activity log." copy="Important content, file and inbox actions leave a timestamped record." /><div className="audit-timeline">{rows?.map((row) => <article key={row._id}><span /><div><Badge variant="outline">{row.entityType}</Badge><h3>{row.summary}</h3><p>{row.actorEmail} · {new Date(row.createdAt).toLocaleString()}</p></div></article>)}</div></section>
}

function ConfirmDelete({ label, onConfirm }: { label:string; onConfirm:()=>Promise<void> }) {
  return <AlertDialog><AlertDialogTrigger render={<Button variant="destructive" />}>Delete</AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {label}?</AlertDialogTitle><AlertDialogDescription>This removes the record from Convex. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep record</AlertDialogCancel><AlertDialogAction onClick={() => void onConfirm()}>Delete permanently</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
}

function Field({ label, multiline, onValueChange, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label:string; multiline?:boolean; onValueChange?:(value:string)=>void }) {
  const shared = { name:props.name, value:props.value, defaultValue:props.defaultValue, required:props.required, placeholder:props.placeholder, onChange:(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onValueChange?.(event.target.value) }
  return <label className={`admin-field ${multiline ? "wide" : ""}`}><span>{label}</span>{multiline ? <Textarea {...shared} /> : <Input {...props} onChange={shared.onChange as React.ChangeEventHandler<HTMLInputElement>} />}</label>
}
function PasswordField({
  id,
  label,
  visible,
  onToggle,
  describedBy,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id:string
  label:string
  visible:boolean
  onToggle:()=>void
  describedBy?:string
}) {
  return (
    <div className="admin-field admin-password-field">
      <label htmlFor={id}>{label}</label>
      <div className="admin-password-control">
        <Input
          {...props}
          id={id}
          type={visible ? "text" : "password"}
          minLength={10}
          required
          aria-describedby={describedBy}
        />
        <button
          type="button"
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          onClick={onToggle}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  )
}
function PanelTitle({ eyebrow, title, copy }: { eyebrow:string; title:string; copy?:string }) { return <header className="admin-panel-title"><p className="admin-kicker">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</header> }
function PanelLoading() { return <div className="admin-loading"><Spinner /> Reading the live workspace…</div> }
function FullScreenStatus({ label }: { label:string }) { return <main className="admin-auth"><div className="admin-loading"><Spinner />{label}</div></main> }
function EmptyCopy({ text }: { text:string }) { return <div className="admin-empty"><CheckCircle2Icon /><p>{text}</p></div> }
function humanize(value:string) { return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()) }

export function AdminPortal() { return <AuthGate /> }
