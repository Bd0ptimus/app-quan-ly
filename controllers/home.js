const wrapAsync = require("../utils/wrapAsync");
const Strat = require("../models/strat");


module.exports.renderHome = wrapAsync(async (req,res) => {
    const strats = await Strat.find();
    let strat = {};
    if(!strats.length) {
        strat = {title: '',
                content: ''}
    }
    else {
        strat = strats[0];
    }
    console.log(strat);
    res.render('main/home', {strat});
})
module.exports.isAuthorized = (req,res,next) => {
    const {work} = req.user;
    if(work.position !== 'admin'){
        req.flash("error", "Bạn không có quyền thực hiện thao tác này");
        return res.redirect("/home");
    }
    else next();
}
module.exports.updateStrat = wrapAsync(async(req,res) => {
    const {title,content, id} = req.body;
    const strat = await Strat.findByIdAndUpdate(id, {title: title, content: content});
    req.flash('success', 'Thành công');
    res.redirect('/home');
})