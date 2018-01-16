App.controller.define('CMain', {

    views: [
        "VMain"
    ],

    require: [
        "api.ecureuil.AO"
    ],

    models: [],

    init: function() {

        this.control({
            'VMain': {
                'view': {
                    show: this.VMain_onshow
                }
            }
        });

        App.init('VMain');

    },
    VMain_onshow: function() {
        App.key.set('first_time', 2);
        /*if (!App.key.get('AUTH')) {
            App.$('#Navigator').dom().pushPage('view/VAuth/VAuth.html', { animation: "lift" });
            return;
        };*/
        /*
                db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                db.sqlBatch([
                    'CREATE TABLE IF NOT EXISTS DemoTable (name, score)', ['INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]],
                    ['INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]],
                ], function() {
                    console.log('Populated database OK');
                }, function(error) {
                    console.log('SQL batch ERROR: ' + error.message);
                });

                db.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(rs) {
                    console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                }, function(error) {
                    console.log('SELECT SQL statement ERROR: ' + error.message);
                });
        */
        var modal = App.$('ons-modal');
        var AO = api.ecureuil.AO;
        var date = App.key.get('update');
        if (!date) {
            var o = new Date().toObject();
            var newDate = (o.year - 1) + "-01-01";
            App.key.set('update', newDate);
            var date = App.key.get('update');
        };

        if (!App.key.get('Favorites')) App.key.set('Favorites', []);

        modal.show();

        AO.getAllByDate(date, function(record) {
            console.log(record);
            if (!App.key.get('AO')) App.key.set('AO', []);
            if (!App.key.get('AOKeys')) App.key.set('AOKeys', []);
            var ao = App.key.get('AO');
            var keys = App.key.get('AOKeys');
            var ids = record.data.getFields('IdAppelOffre');
            var dkeys = ids.diff(keys);


            App.key.set('AOKeys', keys.concat(dkeys));

            for (var j = 0; j < record.data.length; j++) ao.push(record.data[j]);

            App.key.set('AO', ao);
            App.key.set('update', new Date().toMySQL());
            modal.hide();
            App.key.set('first_timer', 2);
        });


    }


})