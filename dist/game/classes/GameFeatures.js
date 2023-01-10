var GameFeatures = /** @class */ (function () {
    function GameFeatures() {
        this.textLevel = 0;
        this.level = 0;
        this.keys = {
            d: {
                pressed: false
            },
            a: {
                pressed: false
            },
            space: {
                pressed: false,
                numberOfJumps: 0
            },
            shift: {
                pressed: false,
                numberOfDashes: 0
            }
        };
    }
    return GameFeatures;
}());
//# sourceMappingURL=GameFeatures.js.map