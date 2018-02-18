angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, ConexionServ, $ionicPopup, $filter) {
  

  ConexionServ.createTables();
  ConexionServ.query('Select  nombres, apellidos, rowid from alumnos', []).then(function(result){
    $scope.alumnos = result ;

  }, function(r2){
     console.log(r2)

  })
         
 



      $scope.remove = function(chat) {
           ConexionServ.query('DELETE from alumnos where  rowid = ?', [chat]).then(function(result){
               $scope.alumnos = $filter('filter')($scope.alumnos, {rowid :'!' + chat})
                    
               $ionicPopup.show({template:'Alumno eliminado', title: 'Guardado', buttons :[{
                    
                         text: '<b>Aceptar</b>',
                          type: 'button positive',

                        }]
                })
              

          })
      }
   
     
})


    .controller('ChatDetailCtrl', function($scope, $stateParams, ConexionServ, $state, $ionicPopup) {
      
       ConexionServ.query('Select * from alumnos where rowid=?', [$stateParams.alumno_id]).then(function(result){
        if (result.length > 0) {
         $scope.alumnos = result[0] ;
             }else{$scope.no_hay= true;}  
       
  }, function(r2){
     console.log(r2)

  })
         

       $scope.ActuAlumno = function(nombres, apellidos, sexo, fecha_nac, pazysalvo){
        

        consulta='UPDATE alumnos SET nombres=?, apellidos=?, sexo=?, fecha_nac=?, pazysalvo=? WHERE rowid=?';
             console.log(consulta)
            datos=[nombres, apellidos, sexo, fecha_nac, pazysalvo, $stateParams.alumno_id];
          

        ConexionServ.query(consulta, datos).then (function(result, tx){
          
           $ionicPopup.show({template:'Alumno actualizado', title: 'Guardado', buttons :[{
                
                     text: '<b>Aceptar</b>',
                      type: 'button positive',

                    }]


                })  
                 
                $state.go("tab.chats")




        })
       }, function(r){
         console.log(   "No se pudo actualizar el alumno" , r);
         
       }
    })

    .controller('AlumnoNuevoCtrl', function($scope, $state, $ionicPopup, ConexionServ ) {
      $scope.alumnos = {};

            $scope.CrearAlumno = function(nombres, apellidos, sexo, fecha_nac, pazysalvo){
             
             consulta='Insert into alumnos(nombres, apellidos, sexo, fecha_nac, pazysalvo) values(?,?,?,?,?) ';
             datos= [nombres, apellidos, sexo, fecha_nac, pazysalvo ];
             
             ConexionServ.query(consulta, datos).then(function(result, tx){
                
                $ionicPopup.show({template:'Alumno creado', title: 'Guardado', buttons :[{
                
                     text: '<b>Aceptar</b>',
                      type: 'button positive',

                    }]


                });  
                 
                $state.go("tab.chats")


             })
             
              
            }
    })
    .controller('AccountCtrl', function($scope) {
      $scope.settings = {
        enableFriends: true
      };
    });
 


 











