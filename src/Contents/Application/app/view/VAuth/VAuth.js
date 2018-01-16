App.viewController.define('VAuth', {
    require: [
        "api.ecureuilmobile.MyService",
        "api.ecureuil.AO"
    ],
    init: function() {

        this.control({
            'view': {
                show: this.onShow
            }
        });

    },
    onShow: function() {
        var io = new App.IO();

        App.DB.get('gestionao2://mobile', function(r) {
            console.log(r);
        });

        function getID() {
            io.connect('http://ecureuil.applications.siipro.fr');
            io.on('connect', function() {
                console.log('connected.');
                io.subscribe('#' + App.key.get('keycode'));
                io.on('#' + App.key.get('keycode'), function() {

                });
            });
        };
        var MyService = api.ecureuilmobile.MyService;
        if (!App.key.get('keycode')) {
            MyService.genID({}, function(value) {
                App.$('.keycode').html(value);
                App.key.set('keycode', value);
                getID();
            });
        } else {
            App.$('.keycode').html(App.key.get('keycode'));
            getID();
        }
    }

});