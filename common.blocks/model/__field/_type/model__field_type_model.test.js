/*BEM.TEST.decl('i-model__field_type_model', function() {

    describe('Field with type "model"', function() {
        BEM.MODEL.decl('model-type-field', {
            f: {
                type: 'model',
                modelName: 'inner-model',
                destruct: true,
                validation: {
                    rules: {
                        deep: true,
                        required: true
                    }
                }
            }
        });
        BEM.MODEL.decl('inner-model', {
            innerF: {
                type: 'string',
                validation: {
                    rules: {
                        required: true,
                        maxlength: 10
                    }
                }
            }
        });

        it('should change values', function() {
            var model = BEM.MODEL.create('model-type-field', {
                    f: {
                        innerF: 'str'
                    }
                }),

                onFieldChange = jasmine.createSpy('onFieldChange'),
                onModelChange = jasmine.createSpy('onModelChange');

            model.on('f', 'change', onFieldChange);
            model.on('change', onModelChange);

            model.set('f', { innerF: 'new str' });

            expect(model.get('f').get('innerF')).toEqual('new str');
            expect(onFieldChange).toHaveBeenCalled();
            expect(onModelChange).toHaveBeenCalled();

            model.destruct();
            expect(BEM.MODEL.get('model-type-field').length).toEqual(0);
            expect(BEM.MODEL.get('inner-model').length).toEqual(0);
        });

        it('should set model as value', function() {
            var model = BEM.MODEL.create('model-type-field', {
                    f: {
                        innerF: 'str'
                    }
                }),
                modelToSet = BEM.MODEL.create({ name: 'inner-model', parentModel: model }, { innerF: 'inner2' }),

                onFieldChange = jasmine.createSpy('onFieldChange'),
                onInnerFieldChange = jasmine.createSpy('onInnerFieldChange'),
                onModelChange = jasmine.createSpy('onModelChange');

            model.on('f', 'change', onFieldChange);
            model.on('change', onModelChange);

            model.set('f', modelToSet);

            expect(model.get('f').get('innerF')).toEqual('inner2');
            expect(onFieldChange).toHaveBeenCalled();
            expect(onModelChange).toHaveBeenCalled();

            model.on('f', 'change', onInnerFieldChange);
            modelToSet.set('innerF', 'bla');
            expect(onInnerFieldChange).toHaveBeenCalled();

            model.destruct();
            expect(BEM.MODEL.get('model-type-field').length).toEqual(0);
            expect(BEM.MODEL.get('inner-model').length).toEqual(0);
        });

        it('should change inner value', function() {
            var model = BEM.MODEL.create('model-type-field', {
                    f: {
                        innerF: 'str'
                    }
                }),

                onFieldChange = jasmine.createSpy('onFieldChange'),
                onModelChange = jasmine.createSpy('onModelChange');

            model.on('f', 'change', onFieldChange);
            model.on('change', onModelChange);

            model.get('f').set('innerF', 'new str');

            expect(model.get('f').get('innerF')).toEqual('new str');
            expect(onFieldChange).toHaveBeenCalled();
            expect(onModelChange).toHaveBeenCalled();

            model.destruct();
            expect(BEM.MODEL.get('model-type-field').length).toEqual(0);
            expect(BEM.MODEL.get('inner-model').length).toEqual(0);
        });

        it('should serialize data', function() {
            var model = BEM.MODEL.create('model-type-field', {
                f: {
                    innerF: 'str'
                }
            });

            expect(model.toJSON()).toEqual({
                f: {
                    innerF: 'str'
                }
            });

            model.destruct();
            expect(BEM.MODEL.get('model-type-field').length).toEqual(0);
            expect(BEM.MODEL.get('inner-model').length).toEqual(0);
        });

        it('should clear data', function() {
            var model = BEM.MODEL.create('model-type-field', {
                f: {
                    innerF: 'str'
                }
            });

            model.clear();

            expect(model.isEmpty()).toEqual(true);

            model.destruct();
            expect(BEM.MODEL.get('model-type-field').length).toEqual(0);
            expect(BEM.MODEL.get('inner-model').length).toEqual(0);
        });

        it('should fix and rollback data', function() {
            var model = BEM.MODEL.create('model-type-field', {
                f: {
                    innerF: 'str'
                }
            });

            model.get('f').set('innerF', 'correct str');
            model.fix();

            model.get('f').set('innerF', 'wrong str');
            expect(model.get('f').get('innerF')).toEqual('wrong str');

            model.rollback();
            expect(model.get('f').get('innerF')).toEqual('correct str');

            model.destruct();
            expect(BEM.MODEL.get('model-type-field').length).toEqual(0);
            expect(BEM.MODEL.get('inner-model').length).toEqual(0);
        });

        it('should not destruct inner model', function() {
            var model = BEM.MODEL.create('model-type-field', {
                f: {
                    innerF: 'str'
                }
            }),
            innerModel = model.get('f'),
            modelToSet = BEM.MODEL.create({ name: 'inner-model', parentModel: model }, { innerF: 'inner2' });

            model.set('f', modelToSet, { destruct: false });
            expect(BEM.MODEL.getOne({ name: 'inner-model', id: innerModel.id })).toBeDefined();

            model.destruct();
            innerModel.destruct();
            expect(BEM.MODEL.get('model-type-field').length).toEqual(0);
            expect(BEM.MODEL.get('inner-model').length).toEqual(0);
        });

        it('should check validation', function() {
            var model = BEM.MODEL.create('model-type-field');

            expect(model
                .set('f', { innerF: 'string' })
                .isValid())
                .toBe(true);

            expect(model
                .set('f', { innerF: 'loooooooooong string' })
                .isValid())
                .toBe(false);

            expect(model
                .clear('f')
                .isValid())
                .toBe(false);

            model.destruct();
            expect(BEM.MODEL.get('model-type-field').length).toEqual(0);
            expect(BEM.MODEL.get('inner-model').length).toEqual(0);
        });

    });

});
*/
