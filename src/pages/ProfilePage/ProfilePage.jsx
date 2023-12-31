import React, { useState, useEffect } from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import BecomeAthlete from '../../components/BecomeAthlete/BecomeAthlete';
import EditUserProfile from '../../components/EditUserProfile/EditUserProfile';
import { getAthlete, deleteAthlete } from '../../utilities/athletes-service';
import { getUser, deleteUser } from "../../utilities/users-service";
import { deleteImageForLoggedInUser } from '../../utilities/userImage-service';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Alert from '@mui/material/Alert';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProfilePage() {
  const [showBecomeAthlete, setShowBecomeAthlete] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [athleteStatus, setAthleteStatus] = useState('');
  const [user, setUser] = useState(getUser());
  const [athleteUpgrade, setAthleteUpgrade] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [athleteUpgrade]);

  useEffect(() => {
    const fetchUserAthleteStatus = async () => {
      try {
        const athlete = await getAthlete(user._id);
        setAthleteStatus(athlete.status);
      } catch (error) {
        console.log('Error fetching athlete status:', error.response);
      }
    };

    if (user && user._id) {
      fetchUserAthleteStatus();
    }
  }, [user]);

  const handleDeleteUser = () => {
    setConfirmationAction('deleteUser');
    setShowConfirmationModal(true);
  };

  const handleConfirmDeletion = async () => {
    if (confirmationAction === 'deleteUser') {
      try {
        // Delete athlete schema if it exists
        if (athleteStatus === 'Approved' || athleteStatus === 'Rejected' || athleteStatus === 'Pending') {
          await deleteAthlete(); // Added optional chaining
        }
        // Delete user
        await deleteUser(); // delete user from database
        await deleteImageForLoggedInUser(); // delete user's image from Cloudinary
        // Remove token from storage (log out the user)
        localStorage.removeItem('token');

        // Redirect user to the desired page after successful deletion
        // For example, redirect to the home page
        window.location.href = '/'; // Change the URL as needed

        // Perform necessary actions after deletion, e.g., log out or redirect
      } catch (error) {
        // Handle error
      }
    }

    // Close the confirmation modal
    setShowConfirmationModal(false);
  };

  const handleCancelDeletion = () => {
    // Close the confirmation modal
    setShowConfirmationModal(false);
  };

  const handleBecomeAthlete = () => {
    setShowBecomeAthlete(false);
    setShowEditProfile(false);
    setAthleteUpgrade(true);
  };
  return (
    <Container>
      <h1>Profile</h1>
      <hr />
      {athleteStatus === 'Pending' && (
        <Alert severity="warning">Your athlete status is pending</Alert>
      )}

      {athleteStatus === 'Approved' && (
        <Alert severity="success">Your athlete status is approved</Alert>
      )}

      { athleteStatus === 'Rejected' && (
        <Alert severity="error">Your athlete status is rejected</Alert>
      )}

      {showEditProfile ? (
        <EditUserProfile user={user} setUser={setUser} />
      ) : showBecomeAthlete ? (
        <BecomeAthlete user={user} handleBecomeAthlete={handleBecomeAthlete}/>
      ) : (
        <UserProfile user={user} />
      )}

      {showEditProfile ? (
        <Button variant='outlined' color='primary' sx={{ mt: 2 }} onClick={() => setShowEditProfile(false)}>Back to profile</Button>
      ) : (
        <>
          {user.role !== 'Athlete' && user.role !== 'Manager' && user.role !== 'Admin' && athleteStatus !== 'Pending' && athleteStatus !== 'Approved' && athleteStatus !== 'Rejected' && (
            <Button variant='contained' color='primary' sx={{ mt: 2, mr: 1 }} onClick={() => setShowBecomeAthlete(!showBecomeAthlete)}>
              {showBecomeAthlete ? 'Back to Profile' : 'Become Athlete'}
            </Button>
          )}
            
          {!showBecomeAthlete && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setShowEditProfile(true)}
            >
              Edit Profile
            </Button>
          )}

            <Box sx={{ mt: 2 }} >
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteUser}
                >Delete User
              </Button>
            </Box>
        </>
      )}

      
      {/* Confirmation Modal */}
      <Modal open={showConfirmationModal} onClose={handleCancelDeletion}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <hr />
          <Typography sx={{ mt: 2, mb: 4 }}>
            Are you sure you want to delete your account?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>        
            <Button variant="contained" onClick={handleCancelDeletion} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirmDeletion} color='error'>Confirm</Button>
          </div>
        </Box>
      </Modal>

    </Container>
  );
}
