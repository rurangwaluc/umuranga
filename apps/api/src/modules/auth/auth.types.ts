export type SignupInput = {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type GoogleAuthInput = {
  idToken: string;
};

export type GoogleProfile = {
  providerAccountId: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
};