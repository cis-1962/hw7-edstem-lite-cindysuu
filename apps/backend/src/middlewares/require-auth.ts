import { Request, Response, NextFunction } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // const username = req.session.username;
    // console.log('username:', username);
    const username = "test";

    if (!username || username.trim() === '') {
        const err = new Error('Unauthorized: No session or user not logged in');
        res.status(401);
        next(err);
    } else {
        next();
    }
}

export default requireAuth;