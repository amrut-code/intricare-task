import { create } from 'zustand'

export interface Campaign {
  id: string
  name: string
  channels: string[]
  createdOn: string
  crmSynced: string | null
  hour: string
  invitesSent: number
  invitesAcceptedRate: number
  replyRate: number
  replyReceivedRate: number
  emailSent: number
  emailOpenedRate: number
  senders: { name: string; avatarUrl: string }[]
  status: 'Running' | 'Paused' | 'Stopped'
  dailyLimit: number
  prospectsProcessed: number
  prospectsTotal: number
}

interface CampaignStore {
  campaigns: Campaign[]
  addCampaign: (name: string, channels: string[]) => void;
  toggleCampaignStatus: (id: string) => void;
  duplicateCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
}

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Tech Founder",
    channels: ["LinkedIn", "Email"],
    createdOn: "21 Jan, 2026",
    crmSynced: "Synced",
    hour: "2h ago",
    invitesSent: 265,
    invitesAcceptedRate: 15,
    replyRate: 125,
    replyReceivedRate: 10,
    emailSent: 400,
    emailOpenedRate: 10,
    senders: [
      {
        name: "John Doe",
        avatarUrl: "/images/avtar2.jpg",
      },
      {
        name: "Jane Smith",
        avatarUrl: "/images/avtar3.jpg",
      },
    ],
    status: "Running",
    dailyLimit: 40,
    prospectsProcessed: 74,
    prospectsTotal: 200,
  },
  {
    id: "2",
    name: "Growth Campaign",
    channels: ["LinkedIn", "Email"],
    createdOn: "21 Jan, 2026",
    crmSynced: null,
    hour: "",
    invitesSent: 265,
    invitesAcceptedRate: 15,
    replyRate: 125,
    replyReceivedRate: 10,
    emailSent: 400,
    emailOpenedRate: 10,
    senders: [
      {
        name: "Alex Johnson",
        avatarUrl: "/images/avtar2.jpg",
      },
      {
        name: "Maria Garcia",
        avatarUrl: "/images/avtar3.jpg",
      },
    ],
    status: "Running",
    dailyLimit: 40,
    prospectsProcessed: 120,
    prospectsTotal: 300,
  },
  {
    id: "3",
    name: "Campaign Pulse",
    channels: ["LinkedIn", "Email"],
    createdOn: "21 Jan, 2026",
    crmSynced: null,
    hour: "",
    invitesSent: 265,
    invitesAcceptedRate: 15,
    replyRate: 125,
    replyReceivedRate: 10,
    emailSent: 400,
    emailOpenedRate: 10,
    senders: [
      {
        name: "Robert Lee",
        avatarUrl: "/images/avtar2.jpg",
      },
      {
        name: "Sarah Connor",
        avatarUrl: "/images/avtar3.jpg",
      },
    ],
    status: "Running",
    dailyLimit: 40,
    prospectsProcessed: 45,
    prospectsTotal: 150,
  },
  {
    id: "4",
    name: "Lead Engine",
    channels: ["LinkedIn", "Email"],
    createdOn: "21 Jan, 2026",
    crmSynced: "Synced",
    hour: "1d ago",
    invitesSent: 265,
    invitesAcceptedRate: 15,
    replyRate: 125,
    replyReceivedRate: 10,
    emailSent: 400,
    emailOpenedRate: 10,
    senders: [
      {
        name: "Sarah Connor",
        avatarUrl: "/images/avtar2.jpg",
      },
      {
        name: "John Connor",
        avatarUrl: "/images/avtar3.jpg",
      },
    ],
    status: "Running",
    dailyLimit: 40,
    prospectsProcessed: 180,
    prospectsTotal: 250,
  },
  {
    id: "5",
    name: "Campaign Hub",
    channels: ["LinkedIn", "Email"],
    createdOn: "21 Jan, 2026",
    crmSynced: "Synced",
    hour: "5h ago",
    invitesSent: 265,
    invitesAcceptedRate: 15,
    replyRate: 125,
    replyReceivedRate: 10,
    emailSent: 400,
    emailOpenedRate: 10,
    senders: [
      {
        name: "Emma Watson",
        avatarUrl: "/images/avtar2.jpg",
      },
      {
        name: "Sarah Connor",
        avatarUrl: "/images/avtar3.jpg",
      },
    ],
    status: "Running",
    dailyLimit: 40,
    prospectsProcessed: 10,
    prospectsTotal: 100,
  },
]

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: INITIAL_CAMPAIGNS,
  addCampaign: (name, channels) => set((state) => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name,
      channels,
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      crmSynced: null,
      hour: "",
      invitesSent: 0,
      invitesAcceptedRate: 0,
      replyRate: 0,
      replyReceivedRate: 0,
      emailSent: 0,
      emailOpenedRate: 0,
      senders: [
        {
          name: "John Doe",
          avatarUrl: "/images/avtar2.jpg",
        },
      ],
      status: "Running",
      dailyLimit: 40,
      prospectsProcessed: 0,
      prospectsTotal: 100,
    }
    return { campaigns: [newCampaign, ...state.campaigns] }
  }),
  toggleCampaignStatus: (id) => set((state) => ({
    campaigns: state.campaigns.map((c) =>
      c.id === id ? { ...c, status: c.status === "Running" ? "Paused" : "Running" } : c
    )
  })),
  duplicateCampaign: (id) => set((state) => {
    const match = state.campaigns.find((c) => c.id === id)
    if (!match) return {}
    const duplicated: Campaign = {
      ...match,
      id: Date.now().toString(),
      name: `${match.name} (Copy)`,
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      prospectsProcessed: 0,
    }
    return { campaigns: [duplicated, ...state.campaigns] }
  }),
  deleteCampaign: (id) => set((state) => ({
    campaigns: state.campaigns.filter((c) => c.id !== id)
  }))
}))
