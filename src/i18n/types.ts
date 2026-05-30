export type Dictionary = {
  common: {
    clientPlatform: string;
    controlPlatform: string;
    dashboard: string;
    brandDNA: string;
    campaigns: string;
    contentStudio: string;
    analytics: string;
    recommendations: string;
    publishing: string;
    creativeRequests: string;
    integrations: string;
    settings: string;
    aiBrain: string;
    monitoring: string;
    billing: string;
    clients: string;
    backup: string;
    systemSettings: string;
    search: string;
    exportReport: string;
    generateAIInsights: string;
    saveDraft: string;
    publishCampaign: string;
    runAnalysis: string;
    addProvider: string;
    runDailyScan: string;
    overview: string;
    learningCenter: string;
    viewAll: string;
    create: string;
    edit: string;
    delete: string;
    cancel: string;
    confirm: string;
    save: string;
    loading: string;
    error: string;
    success: string;
    noData: string;
    refresh: string;
    filter: string;
    sort: string;
    searchPlaceholder: string;
    greetings: {
      morning: string;
      afternoon: string;
      evening: string;
    };
    time: {
      ago: string;
      hour: string;
      hours: string;
      day: string;
      days: string;
      week: string;
      weeks: string;
      month: string;
      months: string;
      year: string;
      years: string;
      "1": string;
      "2": string;
      "3": string;
      "5": string;
    };
  };
  status: {
    active: string;
    inactive: string;
    pending: string;
    completed: string;
    failed: string;
    healthy: string;
    excellent: string;
    good: string;
    warning: string;
    critical: string;
    connected: string;
    disconnected: string;
    online: string;
    offline: string;
  };
  metrics: {
    revenue: string;
    reach: string;
    engagement: string;
    aiScore: string;
    conversion: string;
    impressions: string;
    clicks: string;
    ctr: string;
    cpa: string;
    roas: string;
    budget: string;
    spent: string;
    remaining: string;
  };
  actions: {
    generateReport: string;
    runAnalysis: string;
    viewAll: string;
    createCampaign: string;
    exportReport: string;
    addNew: string;
    manage: string;
    configure: string;
    monitor: string;
    optimize: string;
    pause: string;
    resume: string;
    duplicate: string;
    archive: string;
  };
  theme: {
    lightMode: string;
    darkMode: string;
  };
  navigation: {
    enterClientPlatform: string;
    enterControlPlatform: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
  header: {
    searchCampaigns: string;
    searchSystem: string;
    notifications: string;
    profile: string;
    systemStatus: string;
  };
  sidebar: {
    client: string;
    control: string;
    platform: string;
    systemIntelligence: string;
    learningActive: string;
    health: string;
    learning: string;
    active: string;
  };
  clientDashboard: {
    title: string;
    subtitle: string;
    totalRevenue: string;
    totalReach: string;
    totalEngagement: string;
    aiScore: string;
    hero: {
      title: string;
      subtitle: string;
      greeting: string;
      subtitleText: string;
    };
    kpi: {
      conversions: string;
    };
    featureCards: {
      brandDNA: string;
      brandDNASubtitle: string;
      contentStudio: string;
      contentStudioSubtitle: string;
      campaignStudio: string;
      campaignStudioSubtitle: string;
      analyticsHub: string;
      analyticsHubSubtitle: string;
      competitorIntel: string;
      competitorIntelSubtitle: string;
      open: string;
    };
    performanceOverview: {
      title: string;
      subtitle: string;
      revenue: string;
      target: string;
    };
    topCampaigns: {
      title: string;
      subtitle: string;
    };
    aiRecommendations: {
      title: string;
      subtitle: string;
      recommendations: {
        increaseBudget: string;
        optimizeContent: string;
        launchEmailCampaign: string;
        targetAudienceSegments: string;
      };
    };
    recentActivity: {
      title: string;
      subtitle: string;
      activities: {
        campaignLaunched: string;
        aiOptimizationCompleted: string;
        budgetThresholdReached: string;
        audienceSegmentCreated: string;
      };
      timeLabels: {
        twoHoursAgo: string;
        fiveHoursAgo: string;
        oneDayAgo: string;
        twoDaysAgo: string;
      };
    };
    audienceInsights: {
      title: string;
      subtitle: string;
      thisMonth: string;
      insights: {
        totalAudience: string;
        activeUsers: string;
        engagementRate: string;
      };
    };
    aiBrainActivity: {
      title: string;
      subtitle: string;
      status: {
        excellent: string;
        good: string;
        warning: string;
      };
      allSystemsOperational: string;
      healthScore: string;
      processing: string;
      learning: string;
      optimizing: string;
    };
    previewPanel: {
      title: string;
      dashboard: string;
      aiBrain: string;
      health: string;
      summerCollection: string;
      increaseBudget: string;
      systems: string;
      operational: string;
    };
  };
  clientCampaigns: {
    title: string;
    subtitle: string;
    smartCampaign: string;
    productModel: string;
    serviceModel: string;
    hybridModel: string;
    productCampaign: string;
    serviceCampaign: string;
    hybridCampaign: string;
    productIntelligenceLabel: string;
    serviceMarketingLabel: string;
    multiAgentDirectorLabel: string;
    creativeBattleLabel: string;
    campaignPlanLabel: string;
    urgentLaunchLabel: string;
    schedulePublishLabel: string;
    readinessScoreLabel: string;
    hero: {
      title: string;
      subtitle: string;
      newCampaign: string;
      urgentLaunch: string;
    };
    modeSelector: {
      smartCampaign: string;
      manualCampaign: string;
      smartDescription: string;
      smartBestFor: string;
      productCampaign: string;
      productDescription: string;
      productBestFor: string;
      serviceCampaign: string;
      serviceDescription: string;
      serviceBestFor: string;
      urgentLaunch: string;
      urgentDescription: string;
      urgentBestFor: string;
    };
    businessModel: {
      product: string;
      service: string;
      hybrid: string;
      title: string;
      productDescription: string;
      productImageRequired: string;
      visualFocusedCampaigns: string;
      studioPhotographyDirection: string;
      productVideoConcepts: string;
      serviceDescription: string;
      trustBasedMarketing: string;
      beforeAfterTransformations: string;
      emotionalComfortFocus: string;
      customerOutcomeStories: string;
      hybridDescription: string;
      productServiceCampaigns: string;
      bundleOffers: string;
      afterSalesConfidence: string;
      multiAngleStorytelling: string;
    };
    productPanel: {
      title: string;
      productName: string;
      readiness: string;
      detectedCategory: string;
      autoDetected: string;
      imageStatus: string;
      required: string;
      uploadImage: string;
      uploadDescription: string;
      generatedDirections: string;
    };
    servicePanel: {
      title: string;
      serviceName: string;
      businessType: string;
      contentStrategy: string;
      trustScore: string;
      autoDetected: string;
      uploadBrief: string;
      uploadDescription: string;
      generatedContent: string;
    };
    hybridPanel: {
      title: string;
      productName: string;
      serviceName: string;
      balance: string;
      readiness: string;
      autoDetected: string;
      uploadAssets: string;
      uploadDescription: string;
      generatedAssets: string;
    };
    productIntelligence: {
      title: string;
      analyzing: string;
      category: string;
      audience: string;
      market: string;
      trends: string;
    };
    serviceMarketing: {
      title: string;
      analyzing: string;
      trust: string;
      storytelling: string;
      expertise: string;
      differentiation: string;
    };
    multiAgentDirector: {
      title: string;
      marketingDirector: string;
      creativeDirector: string;
      productionDirector: string;
      publishingDirector: string;
      learningDirector: string;
      collaboration: string;
      decision: string;
    };
    creativeBattle: {
      title: string;
      battleMode: string;
      variants: string;
      winner: string;
      testing: string;
      platform: string;
      asset: string;
      impact: string;
    };
    campaignPlan: {
      title: string;
      timeline: string;
      budget: string;
      channels: string;
      kpis: string;
      campaignGoal: string;
      audience: string;
      creativeAngle: string;
      outputAssets: string;
      platformVersions: string;
      recommendedSchedule: string;
      cta: string;
    };
    urgentLaunch: {
      title: string;
      fastTrack: string;
      immediate: string;
      priority: string;
      launch: string;
    };
    schedulePublish: {
      title: string;
      schedule: string;
      publish: string;
      calendar: string;
      queue: string;
    };
    readinessScore: {
      title: string;
      overall: string;
      assets: string;
      content: string;
      targeting: string;
      ready: string;
    };
  };
  clientAnalytics: {
    title: string;
    subtitle: string;
    performanceMetrics: string;
    audienceDemographics: string;
    campaignComparison: string;
    trendAnalysis: string;
    conversionFunnel: string;
    attribution: string;
    hero: {
      title: string;
      subtitle: string;
      exportReport: string;
      generateInsights: string;
    };
    performanceCommand: {
      title: string;
      overview: string;
      metrics: string;
      trends: string;
    };
    campaignPerformance: {
      title: string;
      campaigns: string;
      performance: string;
      roi: string;
      engagement: string;
      reach: string;
      conversions: string;
      score: string;
    };
    engagementIntelligence: {
      title: string;
      engagement: string;
      reach: string;
      interactions: string;
      sentiment: string;
    };
    conversionIntelligence: {
      title: string;
      conversions: string;
      funnel: string;
      rate: string;
      value: string;
      conversionFunnel: string;
      leadConversionReadiness: string;
      bestConvertingChannel: string;
      weakPoint: string;
    };
    audienceLearning: {
      title: string;
      audience: string;
      demographics: string;
      behavior: string;
      segments: string;
    };
    brandDNAAvolution: {
      title: string;
      brandDNA: string;
      evolution: string;
      consistency: string;
      impact: string;
      dnaConfidence: string;
      evolutionMetrics: string;
      dnaTimeline: string;
    };
    contentPerformance: {
      title: string;
      content: string;
      performance: string;
      topAssets: string;
      optimization: string;
    };
    offerPerformance: {
      title: string;
      offers: string;
      performance: string;
      conversion: string;
      revenue: string;
    };
    channelAttribution: {
      title: string;
      channels: string;
      attribution: string;
      contribution: string;
      roi: string;
    };
    selfLearningSignals: {
      title: string;
      signals: string;
      learning: string;
      patterns: string;
      insights: string;
    };
    aiRecommendationEngine: {
      title: string;
      recommendations: string;
      ai: string;
      optimization: string;
      impact: string;
    };
    learningReadiness: {
      title: string;
      readiness: string;
      data: string;
      models: string;
      accuracy: string;
      overallScore: string;
      checklist: string;
      missing: string;
    };
  };
  clientRecommendations: {
    title: string;
    subtitle: string;
    aiInsights: string;
    optimizationTips: string;
    contentSuggestions: string;
    audienceTargeting: string;
    budgetAllocation: string;
  };
  clientBrandDNA: {
    title: string;
    subtitle: string;
    brandPersonality: string;
    audienceIntelligence: string;
    brandGuidelines: string;
    voiceAndTone: string;
    visualIdentity: string;
  };
  clientContentStudio: {
    title: string;
    subtitle: string;
    creativePipeline: string;
    assetVariations: string;
    brandGuardian: string;
    assetTypeSelector: string;
    contentCalendar: string;
  };
  controlOverview: {
    title: string;
    subtitle: string;
    systemHealth: string;
    integrationStatus: string;
    aiCommandStatus: string;
    clientOverview: string;
    unifiedSourceConnector: string;
    hero: {
      title: string;
      subtitle: string;
      executiveStatus: string;
    };
    adminMetrics: {
      intelligenceLoad: string;
      dnaLearningRate: string;
      growthMomentum: string;
      publishingStability: string;
      revenueVelocity: string;
    };
    aiCommandStatusPanel: {
      title: string;
      subtitle: string;
      online: string;
      learning: string;
      ready: string;
      stable: string;
      active: string;
      marketingBrain: string;
      dnaEngine: string;
      creativeEngine: string;
      publishingEngine: string;
      learningEngine: string;
    };
    integrationHealthPanel: {
      title: string;
      subtitle: string;
      latency: string;
      usage: string;
      openai: string;
      socialPublishingGateway: string;
      designSourceReader: string;
      paymentProvider: string;
      emailService: string;
    };
    systemActivityPanel: {
      title: string;
      learningTaskCompleted: string;
      systemBackupCompleted: string;
    };
    unifiedSourceConnectorPanel: {
      title: string;
      status: string;
      readyForPlanning: string;
      smartSourceReader: string;
      imageAnalysis: string;
      contentAnalysis: string;
    };
  };
  controlAIBrain: {
    title: string;
    subtitle: string;
    brainHealth: string;
    directorsGrid: string;
    directorCollaboration: string;
    decisionTimeline: string;
    confidencePanel: string;
    memoryPanel: string;
    signalsPanel: string;
    hero: {
      title: string;
      subtitle: string;
      runBrainAnalysis: string;
      generateIntelligenceReport: string;
    };
    directors: {
      marketingDirector: string;
      marketingDirectorArabic: string;
      creativeDirector: string;
      creativeDirectorArabic: string;
      productionDirector: string;
      productionDirectorArabic: string;
      publishingDirector: string;
      publishingDirectorArabic: string;
      learningDirector: string;
      learningDirectorArabic: string;
      psychologyDirector: string;
      psychologyDirectorArabic: string;
      thinking: string;
      marketingThinking: string[];
      productionThinking: string[];
      publishingThinking: string[];
      psychologyThinking: string[];
    };
    healthOverview: {
      title: string;
      health: string;
      status: string;
      operational: string;
      learning: string;
      optimizing: string;
      brainHealth: string;
      learningStatus: string;
      decisionConfidence: string;
      campaignIntelligence: string;
      systemStability: string;
      providerIntelligence: string;
    };
    collaboration: {
      title: string;
      collaboration: string;
      coordination: string;
      sync: string;
    };
    timeline: {
      title: string;
      timeline: string;
      decisions: string;
      confidence: string;
      execution: string;
      decision0: string;
      decision1: string;
      decision2: string;
      decision3: string;
      decision4: string;
    };
    confidence: {
      title: string;
      confidence: string;
      accuracy: string;
      prediction: string;
      reliability: string;
      metrics: {
        campaignConfidence: string;
        brandMatch: string;
        audienceMatch: string;
        creativeConfidence: string;
        publishingReadiness: string;
      };
      explanation: string;
    };
    signals: {
      title: string;
      signals: string;
      input: string;
      processing: string;
      output: string;
      strength: {
        strong: string;
        medium: string;
        weak: string;
      };
      signalList0: string;
      signalList1: string;
      signalList2: string;
    };
    thinkingStatus: {
      title: string;
      thinking: string;
      status: string;
      progress: string;
      completion: string;
      statuses: {
        thinking: string;
        ready: string;
        waiting: string;
        analyzing: string;
        learning: string;
      };
    };
    collaborationMap: {
      title: string;
      collaboration: string;
      coordination: string;
      sync: string;
      explanation: string;
      directors0: string;
      directors1: string;
      directors2: string;
      directors3: string;
      directors4: string;
      directors5: string;
      directors6: string;
    };
    brandGuardian: {
      name: string;
      arabicName: string;
      status: string;
      thinking: string[];
    };
    growthDirector: {
      name: string;
      arabicName: string;
      status: string;
      thinking: string[];
    };
    learningEngine: {
      name: string;
      arabicName: string;
      status: string;
      thinking: string[];
    };
    thinking: {
      title: string;
      thinking: string;
      status: string;
      progress: string;
      completion: string;
    };
    directorCards: {
      thinking: string;
    };
  };
  controlIntegrations: {
    title: string;
    subtitle: string;
    operationsHeroLabel: string;
    monthlyCostLabel: string;
    providerPerformanceLabel: string;
    optimizationRecommendationsLabel: string;
    providerCardsLabel: string;
    generationRouterLabel: string;
    promptObedienceLabel: string;
    creativeQualityLabel: string;
    knowledgeSourcesLabel: string;
    infrastructureRisksLabel: string;
    whatIfSimulatorLabel: string;
    providerSwitchingLabel: string;
    hero: {
      title: string;
      subtitle: string;
    };
    monthlyCostIntelligence: {
      title: string;
      monthlyCost: string;
      spend: string;
      budget: string;
      optimization: string;
      currentMonthlyEstimate: string;
      dailyBurnRate: string;
      costBreakdown: string;
      imageGeneration: string;
      videoGeneration: string;
      brainUsage: string;
      publishingServices: string;
      day: string;
      month: string;
      forecastAt: string;
      activeClients: string;
      estimatedValues: string;
    };
    whatIfSimulator: {
      title: string;
      simulator: string;
      scenarios: string;
      simulation: string;
      prediction: string;
      costControlled: string;
      scenarioA: {
        name: string;
        description: string;
        savings: string;
        qualityImpact: string;
      };
      scenarioB: {
        name: string;
        description: string;
        qualityIncrease: string;
        costIncrease: string;
      };
      scenarioC: {
        name: string;
        description: string;
        qualityIncrease: string;
      };
    };
    creativeQualityMonitor: {
      title: string;
      quality: string;
      consistency: string;
      brand: string;
      standards: string;
      metrics: {
        visualQuality: string;
        strongComposition: string;
        printQuality: string;
        goodTextRendering: string;
        commercialQuality: string;
        premiumOutput: string;
        brandConsistency: string;
        stableAcrossProviders: string;
        videoRealism: string;
        runwayLeads: string;
        outputConsistency: string;
        reliablePatterns: string;
      };
    };
    generationRouter: {
      title: string;
      router: string;
      routing: string;
      loadBalancing: string;
      failover: string;
      architecture: {
        theBrain: string;
        brainDescription: string;
        productionSchema: string;
        generationRouter: string;
        routerDescription: string;
        providerAdapter: string;
        adapterDescription: string;
        aiPlatform: string;
        platformDescription: string;
      };
      explanation: string;
    };
    optimizationRecommendations: {
      title: string;
      recommendations: string;
      optimization: string;
      savings: string;
      efficiency: string;
      items: Array<{
        title: string;
        savings?: string;
        qualityLift?: string;
        reason: string;
      }>;
    };
    providerPerformance: {
      title: string;
      providers: string;
      provider: string;
      performance: string;
      uptime: string;
      latency: string;
      quality: string;
      speed: string;
      promptObedience: string;
      stability: string;
      bestUse: string;
      cost: {
        low: string;
        medium: string;
        high: string;
        veryLow: string;
      };
    };
    providerSwitching: {
      title: string;
      switching: string;
      providers: string;
      transition: string;
      backup: string;
      changeDefaultImageProvider: string;
      changeDefaultVideoProvider: string;
      reviewRoutingRules: string;
      roles: {
        defaultImageProvider: string;
        defaultVideoProvider: string;
        premiumImageProvider: string;
        printProvider: string;
        backupProvider: string;
      };
      explanation: string;
      visualOnly: string;
    };
    providerCards: {
      title: string;
      providers: string;
      status: string;
      cost: string;
      performance: string;
      statuses: {
        connected: string;
        available: string;
        suggested: string;
        planning: string;
      };
      actions: {
        disconnect: string;
        connect: string;
        review: string;
        setup: string;
      };
      visualOnly: string;
    };
    smartKnowledgeSources: {
      title: string;
      sources: string;
      knowledge: string;
      retrieval: string;
      accuracy: string;
      types: {
        visual: string;
        marketing: string;
        competitor: string;
        trend: string;
      };
      sourcesList: Array<{
        name: string;
        type: string;
        suggestedUse: string;
        reason: string;
      }>;
      visualOnly: string;
    };
    infrastructureRiskAlerts: {
      title: string;
      risks: string;
      alerts: string;
      monitoring: string;
      mitigation: string;
      infrastructureRiskAlerts: string;
      severities: {
        high: string;
        medium: string;
        low: string;
      };
      alertsList: Array<{
        message: string;
        severity: string;
      }>;
    };
  };
  controlMonitoring: {
    title: string;
    subtitle: string;
    systemMetrics: string;
    alertHistory: string;
    performanceTrends: string;
    uptime: string;
    responseTime: string;
    errorRate: string;
    providerChannelMap: {
      title: string;
      provider: string;
      channel: string;
      messagingServiceProvider: string;
      communicationChannel: string;
    };
    channelRoutingRules: {
      title: string;
      primary: string;
      fallback: string;
      description: string;
    };
    alertPreferences: {
      title: string;
      visualTogglesOnly: string;
      preferences: Array<{
        name: string;
      }>;
    };
    businessAlerts: {
      title: string;
      newSubscription: string;
      subscriptionExpiring: string;
      highUsageClient: string;
      successfulCampaign: string;
      churnRisk: string;
    };
    communicationFailover: {
      title: string;
      scenario: string;
      fallback: string;
      result: string;
      scenarios: Array<{
        scenario: string;
        fallback: string;
        result: string;
      }>;
    };
    financialAlerts: {
      title: string;
      aiCostSpike: string;
      providerPriceIncrease: string;
      monthlyBudgetWarning: string;
      recommendedProviderSwitch: string;
      highCostClientDetected: string;
    };
    salesAlerts: {
      title: string;
      highIntentPhoneCalls: string;
      newPotentialLead: string;
      whatsappClicksSpike: string;
      highMessageVolume: string;
      commentTriggersSpike: string;
    };
    systemAlerts: {
      title: string;
      providerFailure: string;
      apiResponseTime: string;
      deploymentFailure: string;
      generationQueueDelay: string;
      routingFailure: string;
    };
    messagingCommandPreview: {
      title: string;
      returns: string;
      visualOnly: string;
    };
    roleBasedAlerts: {
      title: string;
    };
  };
  controlClients: {
    title: string;
    subtitle: string;
    clientList: string;
    clientDetails: string;
    accountStatus: string;
    usageStats: string;
    billingHistory: string;
  };
  controlBilling: {
    title: string;
    subtitle: string;
    invoiceHistory: string;
    paymentMethods: string;
    billingCycle: string;
    currentBalance: string;
    upcomingCharges: string;
  };
  controlBackup: {
    title: string;
    subtitle: string;
    backupHistory: string;
    scheduleBackup: string;
    restoreBackup: string;
    storageUsage: string;
    retentionPolicy: string;
  };
  controlSystemSettings: {
    title: string;
    subtitle: string;
    generalSettings: string;
    securitySettings: string;
    notificationSettings: string;
    apiSettings: string;
    integrationSettings: string;
  };
  cards: {
    totalRevenue: string;
    totalReach: string;
    totalEngagement: string;
    aiScore: string;
    systemHealth: string;
    activeCampaigns: string;
    totalClients: string;
    monthlyCost: string;
    uptime: string;
  };
  emptyStates: {
    noCampaigns: string;
    noData: string;
    noActivity: string;
    noRecommendations: string;
    createFirst: string;
  };
};
