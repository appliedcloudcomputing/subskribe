var User = Parse.Object.extend("User");

var Response = {
	ParametersEmpty: "Please provide complete details",
	InternalServerError: "Oops! Some error occurred! Please try again",
	NotFound: "Requested resource not found!",
	LoginError: "Some error in current session!",
	SaveSuccess: "Resource saved successfully!",
	UpdateSuccess: "Resource updated successfully!",
	DeleteSuccess: "Resource deleted successfully!"
};

exports.save = function(params) {
	console.log("*******************************************************PARAMETERS :"+ JSON.stringify(params));
	/*if(!params || !params.name || !params.dob || !params.mobile || !params.telephone || !params.email 
		|| !params.address || !params.contactTime || !params.personalNote) 
	{
		params.error(Response.ParametersEmpty);
	} else {*/
		console.log("In Save");
		console.log("**********************SAVING CALLED In Admin Add user ");
		//SAVING USER
		var adduser = new User();
		adduser.set("name", params.name);
		adduser.set("username", params.username);
		adduser.set("email", params.email);
		adduser.set("usertype", params.usertype);
		adduser.set("password",params.password);
		adduser.set("telephone", params.telephone);
		adduser.set("mobile", params.mobile);
		adduser.set("address", params.contactme);
		adduser.set("personalNote", params.personalNote);
		//adduser.set("username",params.email);
		//adduser.set("usertype",params.hideval);
		adduser.save(null, {
			success: function(user) {
				console.log("Admin User Save successfully");
				params.success(Response.SaveSuccess);
			},
			error: function(user, error) {
				console.log("ERROR IN SAVING USER By ADMIN: " + error.message);
				params.error(Response.InternalServerError);
			}
 		});
	//}
};

exports.update = function(params) {
	console.log("User updated successfully");



	if(!params || !params.id || !params.name || !params.dob || !params.mobile || !params.telephone || !params.email 
		 || !params.address) {
		params.error(Response.ParametersEmpty);
	} else {
		var currentUser = Parse.User.current();
		if(!currentUser){
			params.error(Response.LoginError);
		}
			
		console.log("In Update");

		var userQuery = new Parse.Query(User);
		userQuery.get(params.id, {  
				success: function(user) {
				if(user) {
					user.set("name", params.name);
					user.set("dob", params.dob);
					user.set("mobile", params.mobile);
					user.set("telephone", params.telephone);
					user.set("email", params.email);
					user.set("connectiontype", params.conntype);
					user.set("address", params.address);

					//user.set("personalNote", params.personalNote);
					user.set("lastUpdatedBy", currentUser);
					//user.set("username", username);
					//user.set("password", password);
					//	user.set("usertype", usertype);

					user.save(null, {
						success: function(user) {
							params.success(Response.UpdateSuccess);
						},
						error: function(user, error) {
							console.log("ERROR IN UPDATING USER : " + error.message);
							params.error(Response.InternalServerError);
						}
			 		});
				} 
				else {
					params.error(Response.NotFound);
				}
			},
			error: function(error) {
				params.error(Response.InternalServerError);
			}
		});
	}
};
