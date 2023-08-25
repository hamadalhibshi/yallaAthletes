import DashboardPage from '../DashboardPage'
import AdminOffers from '../../../components/Offers/AdminOffers/AdminOffers'
import ManagerOffers from '../../../components/Offers/ManagerOffers/ManagerOffers'
import AthleteOffers from '../../../components/Offers/AthleteOffers/AthleteOffers'
import { Container } from '@mui/material'

export default function OffersPageDashboard({ user }){

  return (
    <Container>
      <DashboardPage user={user} />
      <h1>Offers</h1>
      <hr />
      { user.role === 'Admin' && (
        <AdminOffers />
      )}

      { user.role === 'Manager' && (
        <ManagerOffers user={user} />
      )}

      { user.role === 'Athlete' && (
        <AthleteOffers user={user} />
      )}
    </Container>
  )
}