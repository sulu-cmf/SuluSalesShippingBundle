define(["sulusalesorder/util/sidebar","sulusalesorder/util/orderStatus","sulusalescore/util/helper","sulucontact/model/account","config"],function(a,b,c,d,e){"use strict";var f="#order-form",g={accountContactsUrl:"/admin/api/accounts/<%= id %>/contacts?flat=true",accountAddressesUrl:"/admin/api/accounts/<%= id %>/addresses",accountInputId:"#account-input",deliveryAddressInstanceName:"delivery-address",billingAddressInstanceName:"billing-address",currencySelectInstanceName:"currency-select",currencySelectSelector:"#currency-select",itemTableInstanceName:"order-items",itemTableSelector:"#order-items",paymentTermsInstanceName:"payment-terms",deliveryTermsInstanceName:"delivery-terms",contactSelectId:"#contact-select",validateWarningTranslation:"form.validation-warning",translationConversionFailed:"salescore.conversion-failed",translationShippingFailed:"salescore.shipping-failed"},h=function(){var a,b,c,d=null,e=this.options.data,f=[{id:"save-button",icon:"floppy-o",iconSize:"large","class":"highlight",position:1,group:"left",disabled:!0,callback:function(){this.sandbox.emit("sulu.header.toolbar.save")}.bind(this)}],g={icon:"hand-o-right",iconSize:"large",group:"left",id:"workflow",position:40,items:[]},h={divider:!0};if(this.options.data.id){for(a=-1,b=e.workflows.length;++a<b;)c=e.workflows[a],0===g.items.length?d=c.section:d&&d!==c.section&&(g.items.push(h),d=c.section),g.items.push({title:this.sandbox.translate(c.title),callback:i.bind(this,c)});g.items.length>0&&f.push(g)}this.sandbox.emit("sulu.header.set-toolbar",{template:f})},i=function(a){if(a.hasOwnProperty("event")&&a.event){var b=a.parameters||null;this.sandbox.emit(a.event,b)}else a.hasOwnProperty("route")&&a.route?m.call(this,function(){this.sandbox.emit("sulu.router.navigate",a.route)}.bind(this),l.bind(this,"")):this.sandbox.logger.log("no route or event provided for workflow with title "+a.title)},j=function(){m.call(this,function(){this.sandbox.emit("sulu.salesorder.order.confirm")},l.bind(this,g.translationConversionFailed))},k=function(){m.call(this,function(){this.sandbox.emit("sulu.salesorder.order.edit")},l.bind(this,g.translationConversionFailed))},l=function(a){this.sandbox.emit("sulu.labels.error.show",this.sandbox.translate(a))},m=function(a,b){"function"==typeof a&&(this.saved?a.call(this):this.sandbox.emit("sulu.overlay.show-warning","sulu.overlay.be-careful","sulu.overlay.save-unsaved-changes-confirm",null,function(){this.submit().then(a.bind(this),b.bind(this))}.bind(this)))},n=function(){return this.options.data&&this.options.data.status?this.options.data.status.id:null},o=function(a){this.options.orderStatuses=a},p=function(a){this.options.currencies=a},q=function(){this.sandbox.on("sulu.salesorder.order.edit.clicked",k.bind(this)),this.sandbox.on("sulu.salesorder.order.confirm.clicked",j.bind(this)),this.sandbox.on("sulu.salesorder.set-order-status",o.bind(this)),this.sandbox.on("sulu.salesorder.set-currencies",p.bind(this)),this.sandbox.on("husky.auto-complete."+this.accountInstanceName+".initialized",function(){this.isEditable||this.sandbox.dom.attr(this.$find(g.accountInputId+" input"),"disabled","disabled"),this.dfdAutoCompleteInitialized.resolve()},this),this.sandbox.on("husky.auto-complete."+this.accountInstanceName+".selection-removed",z.bind(this)),this.sandbox.on("sulu.salesorder.order.saved",function(a){this.options.data=a,r.call(this,!0),this.dfdFormSaved.resolve()},this),this.sandbox.on("sulu.header.toolbar.save",function(){this.submit()},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.salesorder.orders.list")},this),this.sandbox.on("husky.input.shipping-date.initialized",function(){this.dfdShippingDate.resolve()},this),this.sandbox.on("husky.input.order-date.initialized",function(){this.dfdOrderDate.resolve()},this),this.sandbox.on("husky.auto-complete."+this.accountInstanceName+".select",z.bind(this)),this.sandbox.on("sulu.editable-data-row."+g.deliveryAddressInstanceName+".initialized",function(){this.dfdDeliveryAddressInitialized.resolve()}.bind(this)),this.sandbox.on("sulu.editable-data-row."+g.billingAddressInstanceName+".initialized",function(){this.dfdInvoiceAddressInitialized.resolve()}.bind(this)),this.sandbox.on("sulu.editable-data-row.address-view."+g.deliveryAddressInstanceName+".changed",function(a){this.options.data.deliveryAddress=a,t.call(this,this.options.data),A.call(this)}.bind(this)),this.sandbox.on("sulu.editable-data-row.address-view."+g.billingAddressInstanceName+".changed",function(a){this.options.data.invoiceAddress=a,t.call(this,this.options.data),A.call(this)}.bind(this)),this.sandbox.on("husky.select."+g.currencySelectInstanceName+".selected.item",function(a){this.sandbox.emit("sulu.item-table."+g.itemTableInstanceName+".change-currency",a),this.currency=a},this)},r=function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},s=function(a){var b=this.sandbox.form.create(f);b.initialized.then(function(){t.call(this,a,!0),u.call(this,a)}.bind(this))},t=function(a){this.sandbox.form.setData(f,a).then(function(){this.accountId=v.call(this)}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},u=function(a){this.sandbox.start(f),a.account&&a.account.id&&B.call(this,a.account.id,a);var b=e.get("sulucontact.components.autocomplete.default.account");b.el=g.accountInputId,b.value=a.account?a.account:"",b.instanceName=this.accountInstanceName,this.sandbox.start([{name:"auto-complete@husky",options:b}])},v=function(){return this.sandbox.dom.attr(g.accountInputId,"data-id")},w=function(a,b){b=b||[],this.sandbox.emit("husky.select.contact-select.update",a,b)},x=function(a,b,c){this.sandbox.emit("sulu.editable-data-row."+b+".data.update",a,c)},y=function(a,b){this.sandbox.emit("sulu.editable-data-row."+a+".set-value",b)},z=function(a){var b=a.id||null;b!==this.accountId&&(this.accountId=b,b?B.call(this,b):(w.call(this,[]),x.call(this,[],g.deliveryAddressInstanceName),x.call(this,[],g.billingAddressInstanceName)))},A=function(){r.call(this,!1)},B=function(a,b){var c,e,f,h;f=d.findOrCreate({id:a}),f.fetch({success:function(a){f=a.toJSON();var c=null,d=null;b||(f.hasOwnProperty("termsOfDelivery")&&f.termsOfDelivery&&(d=f.termsOfDelivery.terms),y.call(this,g.deliveryTermsInstanceName,d),f.hasOwnProperty("termsOfPayment")&&f.termsOfPayment&&(c=f.termsOfPayment.terms),y.call(this,g.paymentTermsInstanceName,c)),f.hasOwnProperty("addresses")&&(h=f.addresses,e=null,b&&b.deliveryAddress?e=b.deliveryAddress:(e=D.call(this,h,"deliveryAddress",!0),!e&&h.length>0&&(e=h[0])),this.sandbox.data.when(this.dfdDeliveryAddressInitialized).then(function(){x.call(this,h,g.deliveryAddressInstanceName,e),this.options.data.deliveryAddress=e}.bind(this)),e=null,b&&b.invoiceAddress?e=b.invoiceAddress:(e=D.call(this,h,"billingAddress",!0),!e&&h.length>0&&(e=h[0])),this.sandbox.data.when(this.dfdInvoiceAddressInitialized).then(function(){x.call(this,h,g.billingAddressInstanceName,e),this.options.data.invoiceAddress=e}.bind(this)))}.bind(this),error:function(){this.sandbox.emit("sulu.labels.warning.show",this.sandbox.translate("error while fetching account"))}.bind(this)}),this.sandbox.util.load(this.sandbox.util.template(g.accountContactsUrl,{id:a})).then(function(a){c=a._embedded.contacts,e=b&&b.contact?[b.contact.id]:null,w.call(this,c,e)}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this))},C=function(a,b){var c=[];return this.sandbox.util.each(b,function(d){return b[d].code===a?(c.push(b[d].id),!1):void 0}.bind(this)),c},D=function(a,b,c){var d=null;return a&&a.length>0&&this.sandbox.util.each(a,function(a,e){return e.hasOwnProperty(b)&&e[b]===c?(d=e,!1):void 0}.bind(this)),d};return{view:!0,layout:{sidebar:{width:"fixed",cssClasses:"sidebar-padding-50"}},templates:["/admin/order/template/order/form"],initialize:function(){this.saved=!0,this.formId=f,this.accountId=null,this.contactId=null,this.dfdFormSaved=this.sandbox.data.deferred(),this.dfdAllFieldsInitialized=this.sandbox.data.deferred(),this.dfdAutoCompleteInitialized=this.sandbox.data.deferred(),this.dfdShippingDate=this.sandbox.data.deferred(),this.dfdOrderDate=this.sandbox.data.deferred(),this.dfdInvoiceAddressInitialized=this.sandbox.data.deferred(),this.dfdDeliveryAddressInitialized=this.sandbox.data.deferred(),this.sandbox.data.when(this.dfdShippingDate,this.dfdOrderDate,this.dfdAutoCompleteInitialized).then(function(){this.dfdAllFieldsInitialized.resolve()}.bind(this)),this.orderStatusId=n.call(this),this.isEditable=this.orderStatusId<=b.IN_CART;var c=this.options.data.id?this.options.data.id:"new";this.accountInstanceName="customerAccount"+c,q.call(this),h.call(this),r.call(this,!0),this.render(),this.listenForChange(),a.initForDetail(this.sandbox,this.options.data)},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate(this.templates[0],{isEditable:this.isEditable,parseDate:c.parseDate}));var a=this.options.data;s.call(this,a),this.startItemTableAndCurrencySelect()},startItemTableAndCurrencySelect:function(){this.sandbox.start([{name:"item-table@sulusalescore",options:{instanceName:g.itemTableInstanceName,isEditable:this.isEditable,remoteUrl:g.accountUrl,data:this.options.data.items,currency:this.options.data.currency,el:g.itemTableSelector}},{name:"select@husky",options:{el:g.currencySelectSelector,instanceName:g.currencySelectInstanceName,disabled:!this.isEditable,emitValues:!0,defaultLabel:this.sandbox.translate("dropdown.please-choose"),multipleSelect:!1,repeatSelect:!1,valueName:"code",data:this.options.currencies,preSelectedElements:C.call(this,this.options.data.currency,this.options.currencies)}}])},submit:function(){if(this.dfdFormSaved=this.sandbox.data.deferred(),this.sandbox.logger.log("save Model"),this.sandbox.form.validate(f)){var a=this.sandbox.form.getData(f);""===a.id&&delete a.id,a.currency=this.currency?this.currency:this.options.data.currency,a.account={id:this.sandbox.dom.attr("#"+this.accountInstanceName,"data-id")},this.sandbox.logger.log("log data",a),this.sandbox.emit("sulu.salesorder.order.save",a)}else this.sandbox.emit("sulu.labels.warning.show",this.sandbox.translate(g.validateWarningTranslation)),this.dfdFormSaved.reject();return this.dfdFormSaved},listenForChange:function(){this.sandbox.data.when(this.dfdAllFieldsInitialized).then(function(){this.sandbox.dom.on(f,"change",A.bind(this),".changeListener select, .changeListener input, .changeListener .husky-select, .changeListener textarea"),this.sandbox.dom.on(f,"keyup",A.bind(this),".changeListener select, .changeListener input, .changeListener textarea"),this.sandbox.on("sulu.item-table.changed",A.bind(this))}.bind(this))}}});