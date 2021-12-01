import { decodeAuthToken } from './helpers';

export async function jwtTokenMiddleware(req, _res?, next?) {
    const authHeader: string | undefined = req.headers?.authorization;

    if (!authHeader) {
        return next && next();
    }
    const [, token] = authHeader.split(' ');

    try {
        const tokenData = await decodeAuthToken(token);
        req.session = {
            id: tokenData.id,
            name: tokenData.name,
        };
    } catch (err) {

    }

    return next && next();
}