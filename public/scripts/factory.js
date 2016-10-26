myApp.factory('factory', ['$http', function($http){
  console.log('in factory');

  var idToken = sessionStorage.getItem('userAuth');
  var isAdmin = true;

  var getAllEmployees = function () {
    console.log('got to getAllEmployees');
    return $http({
    method: 'GET',
    url: 'api/users',
    headers: {
      id_token: idToken}
    });//end http
  };//end getAllEmployees
  //check if a user already exists
  var checkUserDB = function (id, name, photo) {
    console.log('got into checkUserDB');
    return $http({
      method: 'GET',
      url: '/dbcheck/?clientUID=' + id + '&' + name + '&' + photo,
      headers:{
        id_token: idToken}
    });
  };

  var changeIsAdmin = function (id) {
    isAdmin = id;
    console.log('is admin set to:', isAdmin);
  };

  var getMyProjects = function () {
    console.log('into factory getMyProjects');
      if(isAdmin){
        return $http({
          method: 'GET',
          url: 'api/projects/',
          headers: {
            id_token: idToken}
        });
      }else {
        //add an http call for if not admin send ID
      }

  };

  var getAllMyTime = function (project) {
    console.log('made it to getAllMyTime');
    return $http({
      method: "GET",
      url: 'api/time',
      headers: {
        id_token: idToken}
    });
  };

  var addTime = function (objectToSend) {

    return $http({
      method: 'POST',
      url: 'api/time',
      headers: {
        id_token: idToken},
      data: objectToSend
    });
  };
  //get all users for a specific project
  var getProjectUsers = function (projectId) {
    console.log('made it to getProjectUsers');

    return $http({
      method: 'GET',
      url: 'api/users/byProject/?projectId=' + projectId,
      headers: {
        id_token: idToken}
    });
  };//end getProjectUsers function

  var editProject = function (type, value, projId) {
    console.log('made it to editProject with', type, value, projId);
    var objectToSend = {
      type: type,
      value: value,
      projectid: projId
    };

    return $http({
      method: 'PUT',
      url: 'api/projects',
      data: objectToSend,
      headers: {
        id_token: idToken}
    });
  };

  var addProject = function (name, start, end, client, active) {
    console.log('made it to addProject', name, start, end, client);
    var objectToSend = {
      projectname: name,
      startdate: start,
      enddate: end,
      client_id: client,
      isactive: active
    };
    return $http({
      method: 'POST',
      url: 'api/projects',
      data: objectToSend,
      headers: {
        id_token: idToken}
    });
  };

  var deleteTimeEntry = function (timeId) {
    console.log('made it to deleteTimeEntry in factory');

    return $http({
      method: 'DELETE',
      url: '/api/time',
      data: {timeid: timeId},
      headers: {id_token: idToken,
        "Content-Type": "application/json;charset=utf-8"}
    });
  };

  var addEmpToProject = function (empId, projId) {
    console.log('made it to addEmpToProject');
    var objectToSend = {
      empid: empID,
      projectid: projId,
    };
    return $http({
      method: 'POST',
      url: 'api/projects/users',
      data: objectToSend,
      headers: {
        id_token: idToken}            
    });
  };

  return {
    getAllEmployees: getAllEmployees,
    checkUserDB: checkUserDB,
    isAdmin: function () {
      return isAdmin;
    },
    changeIsAdmin: changeIsAdmin,
    getMyProjects: getMyProjects,
    getAllMyTime: getAllMyTime,
    addTime: addTime,
    getProjectUsers: getProjectUsers,
    editProject: editProject,
    addProject: addProject,
    deleteTimeEntry: deleteTimeEntry,
    addEmpToProject: addEmpToProject
  };

}]);
