class Tooltip {

    async close() {
        // Used static click to title for closing tooltip (For tooltip was used external lib and tooltip can't be handled for iOS)
        await browser.execute('mobile: tap', { x: 0, y: 50 });
    };

};
 
module.exports = Tooltip;