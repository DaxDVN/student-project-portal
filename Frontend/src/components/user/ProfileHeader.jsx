import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {imgDB, txtDB} from '../../utils/txtImgConfig.js';
import {v4} from 'uuid'
import {getDownloadURL, ref, uploadBytes} from '@firebase/storage';
import {addDoc, collection, getDocs} from '@firebase/firestore';
import {useDispatch} from 'react-redux';
import {changeAvatar} from '../../features/user/userSlice.js';
import {toggleImage} from '../../features/common/commonSlice.js';

const ProfileHeader = ( props ) => {
  const currentUser = props.currentUser
  const dispatch = useDispatch()
  const [formDisplay, setFormDisplay] = useState( false )
  const handleUpload = ( file ) => {
    const imgs = ref( imgDB, `Imgs/${ v4() }` );
    uploadBytes( imgs, file ).then( ( data ) => {
      getDownloadURL( data.ref ).then( async ( val ) => {
        await handleClick( val ).then(
          () => saveToDb( val ),
        )
      } );
    } );
  };
  const saveToDb = async ( val ) => {
    await dispatch( changeAvatar( {
      id: currentUser.id,
      avatar: val,
    } ) ).then(
      ( response ) => {
        if (response.type.includes( 'fulfilled' )) {
          dispatch(toggleImage())
          props.setLoad( !props.load )
        }
      },
    )
  }
  const handleSaveImage = () => {
    if (imagePreview) {
      const fileInput = document.getElementById( 'file-upload' );
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        handleUpload( file );
        setFormDisplay( false )
      }
    }
  };
  const handleClick = async ( val ) => {
    const valRef = collection( txtDB, 'txtData' )
    await addDoc( valRef, {imgUrl: val} )
  }
  
  const [imagePreview, setImagePreview] = useState( null );
  
  const handleImageChange = ( e ) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview( reader.result );
      };
      reader.readAsDataURL( file );
    }
  };
  
  return (
    <div className='profile-header'>
      
      <div style={ {
        display: formDisplay === true ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 900,
      } }
      ></div>
      
      <div className='col-4' style={ {
        display: formDisplay === true ? 'block' : 'none',
        zIndex: 999,
        position: 'fixed',
        top: '20vh',
        left: '35vw',
      } }>
        <div className='card' style={ {height: '50vh'} }>
          <div className='card-body'>
            <div>
              <div className='row'>
                <div className='col-11'>
                  <h5 className='form-title'>
                    <span>Update Photo</span>
                  </h5>
                </div>
                <div className={ 'col-1' }>
                  <i className={ 'fas fa-close' }
                     style={ {cursor: 'pointer'} }
                     onClick={ () => setFormDisplay( false ) }></i>
                </div>
                <div className={ 'col-12 mt-3' }
                     style={ {
                       maxWidth: '100%', display: 'flex',
                       justifyContent: 'center', transform: 'scale(1.5)',
                     } }>
                  <div className='col-auto profile-image'>
                    <img
                      className='rounded-circle'
                      alt='User Image'
                      style={ {border: '4px solid #338DF2', objectFit: 'cover', width: '150px', height: '150px'} }
                      src={ imagePreview !== null ? imagePreview : currentUser.avatar }
                    />
                  </div>
                </div>
                <div className={ 'col-12 mt-5' }
                     style={ {maxWidth: '100%', display: 'flex', justifyContent: 'space-between'} }>
                  <div>
                    <label htmlFor='file-upload' className='custom-file-upload'>
                      Upload Image
                    </label>
                    <input
                      id='file-upload'
                      type='file'
                      className='input-file'
                      onChange={ handleImageChange }
                    />
                  </div>
                  <button className='btn btn-success' onClick={ handleSaveImage }>
                    Save Image
                  </button>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row align-items-center'>
        <div className='col-auto profile-image'>
          <img
            className='rounded-circle'
            alt='User Image'
            src={ currentUser.avatar }
            onClick={ () => setFormDisplay( true ) }
            style={ {cursor: 'pointer', objectFit: 'cover', width: '150px', height: '150px'}}
          />
        </div>
        <div className='col ml-md-n2 profile-user-info'>
          <h4 className='user-name mb-0'>{ currentUser.fullName }</h4>
          <h6 className='text-muted'>{ currentUser.email }</h6>
          <div className='about-text'>{ currentUser.note }</div>
        </div>
        <div className='col-auto profile-btn'>
        
        
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
