App.viewController.define('VTinder', {

    require: [

    ],

    init: function() {

        this.control({
            'view': {
                show: this.TinderShow
            },
            '#closebutton': {
                click: function(e) {
                    App.$('#Navigator').dom().popPage({ animation: "lift" });
                }
            }
        });

    },
    TinderShow: function(me) {
        App.key.set('first_timer', 2);
        var ul = App.$("#TinderUL");
        var data = me.target.data.items;

        var tpl = [
            '<li class="pane$i">',
            '</li>'
        ].join('');

        var max = 10;
        if (data.length < max) max = data.length;
        for (var i = 0; i < max; i++) {
            App.$('<li class="pane' + i + '"></li>').appendTo(ul);
        };
        $("#tinderslide").jTinder({
            onDislike: function(item) {
                //alert('Dislike image ' + (item.index() + 1));
            },
            onLike: function(item) {
                //alert('Like image ' + (item.index() + 1));
            },
            animationRevertSpeed: 200,
            animationSpeed: 400,
            threshold: 1,
            likeSelector: '.like',
            dislikeSelector: '.dislike'
        });
    }

});