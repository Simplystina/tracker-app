import { Appwrite } from 'appwrite'





const sdk = new Appwrite ();

sdk.setEndpoint('https://tracker.myappwriteinstance.me/v1') // Your Appwrite Endpoint
    .setProject('6274251348c57f1f5322') // Your project ID
;


//account instances
export const account = sdk.account
//database instances
export const database = sdk.database




//functions for handling documents

// creating applications
export const createApplication = async (applicationData) =>{
    const user = await account.get()
    try{
        await database.createDocument('627ba4875a25e3bc71d9', 'unique()',applicationData,[`user:${user['$id']}`],[`user:${user['$id']}`]);
    }catch(e){
        console.log(e.message)
        if(e.code ===401){
            console.log('error you are not allowed to perform this operation')
        }
    }
}


//read all applications for a user
export const getApplications = async ()=>{
  try{
     return await database.listDocuments('627ba4875a25e3bc71d9')
  }
  catch(error){
      console.log(error.code,error.message)
  }
}


//updating a user apllication
export const updateDocument  = async  (collecectionId, documentID,updatedData) => {
    try{
        await database.updateDocument(collecectionId,documentID,updatedData)
    }catch(e){
        console.log(e.code,e.message)
    }
}


//deleting a user application
export const deleteDocument  = async  (collecectionId, documentID) => {
    try{
        await database.deleteDocument(collecectionId,documentID)
    }catch(e){
        console.log(e.code,e.message)
    }
}



//function for fecthing currently authenticated user
export const getCurrentUser = async () => {
     const newUser =  await account.get() //get newly authenticated user
     return newUser
}


//logging user out 
export const logOutUser = async () =>  {
    try{
        await account.deleteSession('current')
        localStorage.removeItem('auth_state')
    }catch(err){
        console.log(err)
    }

}
     


//funtion for signing user with email and password
export const signInuser = async (email, password) => {
    await account.createSession(email,password)
    localStorage.setItem('auth_state', 1)
}



//function for user signup
export const signUpUser = async (name, email, password) => {

   await account.create('unique()',email,password,name)
    await account.createSession(email,password)
    localStorage.setItem('auth_state', 1)
}



//function for authenticating with google
export const signUpWithGoogle = async () =>{
    try{
        await account.createOAuth2Session('google', 'https://trackerappwrite.netlify.app/dashboard/overview','https://trackerappwrite.netlify.app/login');
        localStorage.setItem('auth_state', 1)
    }
    catch(e){
        console.log(e, "erorrrrrrrrr")
        //console.error(e)
    }
}

//functions for updating user detail
export const updateName = async (name) =>  await account.updateName(name);

export const updatePassword = async (newpassword,oldPassword) => await account.updatePassword(newpassword,oldPassword);

export const updateEmail = async (email,password) => await account.updateEmail(email,password);


export default sdk




