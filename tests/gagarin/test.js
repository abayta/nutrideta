describe('Tests unitarios - Nutrideta', function () {
    //Definimos el servidor y cliente de meteor
    var server = meteor();
    var client = browser(server);

    //Antes de nada, insertamos datos en la bbdd
    before(function () {
        return client.execute(function () {
            Notes.insert({_id: '34234234',
                title: 'Nota 1'
            });
            Notes.insert({_id: '34234232',
                title: 'Nota 2'
            });
        });
    });

    it('Prueba de conexión con servidor', function () {
        return server.execute(function () { console.log('Estoy aquí funcionando!');});
    });

    it("Prueba búsqueda nota", function () {
        return server.wait(1000, 'Esperando la propagación de datos', function () {
            return Notes.findOne({_id: '34234234'});
        }).then(function (value) {
            expect(value).to.be.ok;
            expect(value._id).to.equal('34234234');
        });
    });

    it("Prueba contar notas", function () {
        return server.wait(1000, 'Esperando la propagación de datos', function () {
            return Notes.find({});
        }).then(function (value) {
            expect(value).to.be.ok;
            expect(value.length).to.have.lengthOf(2);
        });
    });

});

