// Wakapi
export interface WakapiSummaries {
  data: {
    data: [
      {
        grand_total: {
          hours: number
        }
        range: {
          start: string
        }
      },
    ]
    daily_average: {
      seconds: number
    }
    end: string
  }
}

export interface WakapiStats {
  data: {
    data: {
      total_seconds: number
      daily_average: number
      languages: [
        {
          name: string
          total_seconds: number
        },
      ]
      categories: [
        {
          name: string
          total_seconds: number
        },
      ]
    }
  }
}

// Github stats
export interface Stats {
  stars: number
  totalCommits: number
  totalRepos: number
  followers: number
  contributions: number
  prs: number
  issues: number
  contributionCalendar: {
    totalContributions: string
    weeks: [{
      contributionDays: [{
        date: string
        contributionCount: number
      }]
    }]
  }
}
