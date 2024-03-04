import React, { Component } from 'react';
import './BookingList.css'; // Import CSS file for styling
import BookingPage from './bookingPage';

class BookingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [] , // Initialize bookings as an empty array
            showBookingPage: false,
            rescheduleBooking: false
        };
    }

    componentDidMount() {
        this.fetchBookings();
    }

    fetchBookings = async () => {
        try {
            const response = await fetch('http://localhost:3100/bookings');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const bookings = await response.json();
            this.setState({ bookings: JSON.parse(bookings) });  // Update state with fetched bookings
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    handleCancel(bookingId) {
        // Construct the URL for the cancel booking API endpoint
        const url = `http://localhost:3100/bookings/${bookingId}`;
      
        // Make a DELETE request using fetch API
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // You might need to include additional headers like authorization token
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to cancel booking');
          }
          // Handle success response here if needed
          
          this.fetchBookings()

        })
        .catch(error => {
          console.error('Error cancelling booking:', error);
          // Handle error here
        });
      }

      handleReschedule(booking){
        this.setState({showBookingPage : true, bookingDetails: booking, rescheduleBooking: true})
      }

      handleNewBooking(){
        this.setState({showBookingPage : true, bookingDetails: null, rescheduleBooking: false})
      }
      

    render() {
        const { bookings } = this.state;

        return (
            !this.state.showBookingPage ? <div className="booking-list-container">
                <h2>Booking List</h2>
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>No. of Rooms</th>
                            <th>No. of People</th>
                            <th>Hotel ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.checkin}</td>
                                <td>{booking.checkout}</td>
                                <td>{booking.numberOfRooms}</td>
                                <td>{booking.numberOfPeople}</td>
                                <td>{booking.hotelId}</td>
                                <td><button onClick={() => this.handleCancel(booking.id)}>Cancel</button> <button onClick={() => this.handleReschedule(booking)} >Reschedule</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => this.handleNewBooking()}>New Booking</button>
            </div> : <BookingPage hotelName = {this.state.bookingDetails && this.state.bookingDetails.hotelName ? this.state.bookingDetails.hotelName : null} initialBookingDetails = { this.state.rescheduleBooking ? this.state.bookingDetails : null}></BookingPage>

        );
    }
}

export default BookingList;
