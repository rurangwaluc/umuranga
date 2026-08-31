import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

type AccessTokenPayload = {
  sub: string;
  email: string;
};

type RefreshTokenPayload = {
  sub: string;
  tokenId: string;
};

export function createAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m"
  });
}

export function createRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "30d"
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload & {
    iat: number;
    exp: number;
  };
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload & {
    iat: number;
    exp: number;
  };
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function randomTokenId() {
  return crypto.randomUUID();
}