export interface TermsContent {
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  }
  
  export interface PrivacyContent {
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  }
  
  export interface AboutContent {
    description: string;
    mission: string;
    features: string[];
    stats: {
      activeTraders: string;
      aum: string;
      uptime: string;
    };
  }
  
  export interface ContactContent {
    email: string;
    phone: string;
    address: string;
    businessHours: string;
    emailResponseTime: string;
  }
  
  export interface SettingsContent {
    terms: TermsContent;
    privacy: PrivacyContent;
    about: AboutContent;
    contact: ContactContent;
  }
  
  const DEFAULT_CONTENT: SettingsContent = {
    terms: {
      lastUpdated: '2025-01-15',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using the Turtle Trades platform, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
          title: '2. Trading Services',
          content: 'Turtle Trades provides algorithmic trading services and market analysis tools. Our platform is designed for experienced traders and investors.'
        },
        {
          title: '3. Risk Disclosure',
          content: 'Trading involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results.'
        },
        {
          title: '4. User Responsibilities',
          content: 'Users are responsible for maintaining the confidentiality of their account information and for all activities under their account.'
        },
        {
          title: '5. Prohibited Activities',
          content: 'Users may not engage in market manipulation, fraudulent activities, or any actions that violate applicable laws and regulations.'
        }
      ]
    },
    privacy: {
      lastUpdated: '2025-01-15',
      sections: [
        {
          title: 'Information We Collect',
          content: 'We collect information you provide directly to us, such as when you create an account, make trades, or contact us for support.'
        },
        {
          title: 'How We Use Your Information',
          content: 'We use your information to provide and maintain our trading services, process transactions, send technical notices and security alerts, and provide customer support.'
        },
        {
          title: 'Data Security',
          content: 'We implement industry-standard security measures to protect your personal and financial information, including encryption and secure data transmission protocols.'
        },
        {
          title: 'Information Sharing',
          content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.'
        }
      ]
    },
    about: {
      description: 'Turtle Trades is a cutting-edge algorithmic trading platform designed for serious traders and investors who demand precision, reliability, and performance.',
      mission: 'To democratize access to sophisticated trading algorithms and provide retail traders with institutional-grade tools and strategies.',
      features: [
        'Advanced algorithmic trading strategies',
        'Real-time market analysis and insights',
        'Comprehensive risk management tools',
        'Portfolio optimization algorithms',
        '24/7 automated trading capabilities'
      ],
      stats: {
        activeTraders: '10,000+',
        aum: '$50M+',
        uptime: '99.9%'
      }
    },
    contact: {
      email: 'support@turtletrades.com',
      phone: '+1 (555) 123-TRADE',
      address: '123 Financial District\nNew York, NY 10004\nUnited States',
      businessHours: 'Monday - Friday: 6AM - 6PM EST\nWeekend: Emergency Support Only',
      emailResponseTime: '2-4 hours'
    }
  };
  
  export class ContentManager {
    private static STORAGE_KEY = 'turtle_trades_settings_content';
  
    static getContent(): SettingsContent {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Merge with defaults to ensure all properties exist
          return {
            terms: { ...DEFAULT_CONTENT.terms, ...parsed.terms },
            privacy: { ...DEFAULT_CONTENT.privacy, ...parsed.privacy },
            about: { ...DEFAULT_CONTENT.about, ...parsed.about },
            contact: { ...DEFAULT_CONTENT.contact, ...parsed.contact }
          };
        }
      } catch (error) {
        console.warn('Error loading content from localStorage:', error);
      }
      return DEFAULT_CONTENT;
    }
  
    static saveContent(content: SettingsContent): void {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(content));
      } catch (error) {
        console.error('Error saving content to localStorage:', error);
      }
    }
  
    static updateSection(section: keyof SettingsContent, data: any): void {
      const content = this.getContent();
      content[section] = { ...content[section], ...data };
      this.saveContent(content);
    }
  
    static resetToDefaults(): void {
      this.saveContent(DEFAULT_CONTENT);
    }
  }