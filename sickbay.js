Patients = new Meteor.Collection('Patients');

if (Meteor.isClient) {
	Template.sickbay.created = function(){
		Session.set('currentPatientInfo','');
		this.patientObserver = Patients.find().observe({

		});
	}
	Template.sickbay.currentPatientInfo = function(which){
		if (Session.get('currentPatientId') == '' || Session.get('currentPatientId') == undefined){
			return '';
		} else {
			var patient = Patients.findOne(Session.get('currentPatientId'));
		return patient[which];
		}
	}
	Template.sickbay.patients = function(){
		return Patients.find();
	};
	Template.sickbay.blobStyle = function(){
		var patient = Patients.findOne(Session.get('currentPatientId'));
		$('#blob').css('left', patient.x);
		$('#blob').css('top', patient.y);
	};
	Template.sickbay.events({
		'click #man': function (e, t) {
			x = e.pageX - 25,
			y = e.pageY - 25;
			$('#blob').css('left', x);
			$('#blob').css('top',y);
			$('#blob').css('display', 'block');
		},
		'click .submitPatientInfo': function(e, t){
			var obj = {};
			obj.name = t.find('.nameInput').value;
			obj.symptoms = t.find('.symptomsInput').value;
			obj.x = t.find('#blob').offsetLeft;
			obj.y = t.find('#blob').offsetTop;
			Patients.insert(obj);
		},
		'click .updatePatientInfo': function(e, t){
			var patient = Patients.findOne(Session.get('currentPatientId'));
			var obj = {};
			obj.name = t.find('.nameUpdate').value;
			obj.symptoms = t.find('.symptomsUpdate').value;
			obj.x = t.find('#blob').offsetLeft;
			obj.y = t.find('#blob').offsetTop;
			Patients.update(patient._id, {$set: obj});
		},
		'click .patientName': function(e, t){
			console.log(this._id);
			Session.set('currentPatientId',this._id);
			$('#blob').css('left', this.x);
			$('#blob').css('top', this.y);
			$('#blob').css('display', 'block');
		}

	});
}

if (Meteor.isServer){

}