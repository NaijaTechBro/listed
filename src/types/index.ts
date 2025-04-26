// client/src/types/index.ts (adding to existing types)

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    role: 'founder' | 'investor' | 'admin' | 'user';
    // Other relevant user fields
  }

  export interface AuthResponse {
    success: boolean;
    message: string;
  }
  
  export interface LoginResponse extends AuthResponse {
    token: string;
    user: User;
  }
  
  export interface ResetPasswordResponse extends LoginResponse {}
  
  export interface VerificationResponse extends AuthResponse {}


  
export interface Startup {
    _id: string;
    name: string;
    logo: string;
    tagline: string;
    description: string;
    website: string;
    category: string;
    subCategory: string;
    country: string;
    city: string;
    foundingDate: string;
    stage: string;
    products?: string;
    metrics: {
      fundingTotal: number;
      employees: number;
      connections: number;
      views: number;
      revenue: 'Pre-revenue' | '$1K-$10K' | '$10K-$100K' | '$100K-$1M' | '$1M-$10M' | '$10M+' | 'Undisclosed';
    };
    socialProfiles: {
      linkedin: string;
      twitter: string;
      facebook: string;
      instagram: string;
    };
    founders: Founder[];
    fundingRounds?: FundingRound[];
    createdBy: string; // Reference to Users
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Founder {
    name: string;
    role: string;
    linkedin: string;
    bio?: string;
  }

  export interface StartupShowcaseProps {
    startups: Startup[];
  }
  
  export interface FundingRound {
    stage: string;
    date: string;
    amount: number;
    valuation?: number;
    investors?: string[];
    notes?: string;
  }
  
  export interface Investor {
    _id: string;
    userId: string; // Reference to User
    name: string;
    position: string;
    organization: string;
    investmentFocus: string[];
    preferredStages: string[];
    preferredSectors: string[];
    preferredCountries: string[];
    minInvestmentRange: number;
    maxInvestmentRange: number;
    bio: string;
    portfolio: InvestorPortfolio[];
    profileImage: string;
    contactDetails: {
      email: string;
      phone?: string;
      website?: string;
    };
    socialProfiles: {
      linkedin?: string;
      twitter?: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  
  export interface InvestorPortfolio {
    startupName: string;
    startupId?: string; // If the startup is on the platform
    investmentDate: string;
    investmentStage: string;
    description?: string;
  }
  
  export interface Connection {
    _id: string;
    investorId: string;
    startupId: string;
    status: 'pending' | 'accepted' | 'rejected';
    message: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SavedStartup {
    investorId: string;
    startupId: string;
    note?: string;
    createdAt: string;
  }
  
  export interface StartupFilter {
    category?: string;
    country?: string;
    stage?: string;
    searchTerm?: string;
    featured?: boolean;
    limit?: number;
    createdBy?: string;
    sort?: string;
    fundingRange?: {
      min?: number;
      max?: number;
    };
    employeeCount?: {
      min?: number;
      max?: number;
    };
  }