var sections = [{
    'id' : 3,
    'name' : 'Идеи для подарка',
    'system' : false
  }, {
    'id' : 2,
    'name' : 'Скидки',
    'system' : false
  }, {
    'id' : 1,
    'name' : 'Популярное',
    'system' : false
  }],

  sectionRestangularProcessingData = [
    {'id':3,'name':'Идеи для подарка','system':false,'products_count':22,'special_products_count':0,'type':'section','style':{'background-image':'url(//localhost:3000/images/section/3.svg)'},'route':'sections','reqParams':null,'restangularized':true,'fromServer':true,'parentResource':null,'restangularCollection':false},
    {'id':2,'name':'Скидки','system':false,'products_count':42,'special_products_count':2,'type':'section','style':{'background-image':'url(//localhost:3000/images/section/2.svg)'},'route':'sections','reqParams':null,'restangularized':true,'fromServer':true,'parentResource':null,'restangularCollection':false},
    {'id':1,'name':'Популярное','system':false,'products_count':95,'special_products_count':2,'type':'section','style':{'background-image':'url(//localhost:3000/images/section/1.svg)'},'route':'sections','reqParams':null,'restangularized':true,'fromServer':true,'parentResource':null,'restangularCollection':false}
  ],

  //sectionNavItems = [
  //  {"id":3,"type":"section","name":"Идеи для подарка","system":false,"style":{"background-image":"url(http://localhost:3000/images/section/3.svg)"},"products_count":22,"special_products_count":0},
  //  {"id":2,"type":"section","name":"Скидки","system":false,"style":{"background-image":"url(http://localhost:3000/images/section/2.svg)"},"products_count":42,"special_products_count":2},
  //  {"id":1,"type":"section","name":"Популярное","system":false,"style":{"background-image":"url(http://localhost:3000/images/section/1.svg)"},"products_count":95,"special_products_count":2}
  //],

  sectionProcessingPro = [
      {"id":3,"name":"Идеи для подарка","system":false,"type":"section","style":{"background-image":"url(http://localhost:3000/images/section/3.svg)"}},
      {"id":2,"name":"Скидки","system":false,"type":"section","style":{"background-image":"url(http://localhost:3000/images/section/2.svg)"}},
      {"id":1,"name":"Популярное","system":false,"type":"section","style":{"background-image":"url(http://localhost:3000/images/section/1.svg)"}}
  ],

  sectionPocessingBeta = [
      {"id":3,"name":"Идеи для подарка","system":false,"type":"section","style":{"background-image":"url(http://localhost:3000/images/section/3.svg)"}},
      {"id":2,"name":"Скидки","system":false,"type":"section","style":{"background-image":"url(http://localhost:3000/images/section/2.svg)"}},
      {"id":1,"name":"Популярное","system":false,"type":"section","style":{"background-image":"url(http://localhost:3000/images/section/1.svg)"}}
  ];



function mockSectionModel(sections) {
  sections.forEach(function(item) {
    sectionNavItems.push( new Section( TestUtils.replaceLocalhostUrl(item) ) );
  });
}

sectionNavItems = [];
mockSectionModel(sectionRestangularProcessingData);
