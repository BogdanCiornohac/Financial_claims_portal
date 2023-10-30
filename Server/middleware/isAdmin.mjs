import ExpressError from "../utils/ExpressError.mjs";


export default function isAdmin(req, res, next) {
    const { userId } = req.body;
    const user = res.locals.user;
    if (!user.isAdmin) {
        next(new ExpressError("User is not admin", 404));
    }
    next()
}