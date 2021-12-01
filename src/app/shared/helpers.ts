import { ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { jwt as jwtConfig } from '../../config';

import * as moment from 'moment';

const expirationPeriod = '30d';
const algorithm = 'RS256';

export interface TokenPayload {
    id: string;
    name: string;
    createdAt: number;
    expireDate?: Date;
}

export function generateAuthToken(
    id: string,
    name: string,
): string {
    const payload: TokenPayload = {
        id,
        name,
        createdAt: Date.now(),
    };

    return generateToken(payload);
}

export function generateToken(payload: TokenPayload, expiresIn?: string): string {
    const header = { typ: 'JWT', alg: algorithm };

    return jwt.sign(payload, jwtConfig.privateKey, {
        algorithm,
        header,
        expiresIn: expiresIn || expirationPeriod,
    });
}

export async function decodeAuthToken(authToken: string): Promise<TokenPayload> {
    if (!authToken.length) {
        throw new ForbiddenException('Verification failed');
    }

    try {
        const payload = await jwt.verify(authToken, jwtConfig.publicKey, { algorithms: [algorithm] });
        payload.expireDate = moment.unix(payload.exp).toDate();

        return payload;
    } catch (e) {
        throw new ForbiddenException('Verification failed');
    }
}