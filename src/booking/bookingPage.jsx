import React, { Component } from 'react';
import BookingList from './bookingList';

class BookingPage extends Component {
    constructor(props) {
        super(props);
        if (props.initialBookingDetails) {
            // If initial booking details are provided, use them to initialize state
            const { checkin, checkout, numberOfRooms, numberOfPeople, hotelId, hotelName } = props.initialBookingDetails;
            this.state = {
                checkin,
                checkout,
                numberOfRooms,
                numberOfPeople,
                hotelId,
                hotelName,
                showBookingList: false
            };
        } else {
            // If no initial booking details provided, initialize with default values
            this.state = {
                checkin: '',
                checkout: '',
                numberOfRooms: 1,
                numberOfPeople: 1,
                hotelId: props.hotelId,
                hotelName: props.hotelName,
                showBookingList: false
            };
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { checkin, checkout, numberOfRooms, numberOfPeople, hotelId, hotelName } = this.state;
    
        // Construct the request body
        const requestBody = {
            checkin,
            checkout,
            numberOfRooms,
            numberOfPeople,
            hotelId,
            hotelName
        };
    
        try {
            const response = await fetch('http://localhost:3100/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit booking details');
            }
    
            // Handle successful response
            console.log('Booking details submitted successfully');
            this.setState({
                showBookingList: true
            })
            // Optionally, you can navigate to a success page or perform any other action here
        } catch (error) {
            console.error('Error submitting booking details:', error.message);
            // Handle error, display error message to the user, etc.
        }
    };

    handleBookingList(){
        this.setState({
            showBookingList: true
        })
    }
    

    render() {
        return (
            !this.state.showBookingList ? <div>
                <h2>Booking Details for Hotel {this.state.hotelName ?  this.state.hotelName : null}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Check-in:</label>
                        <input type="date" name="checkin" value={this.state.checkin} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Check-out:</label>
                        <input type="date" name="checkout" value={this.state.checkout} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>No. of Rooms:</label>
                        <input type="number" name="numberOfRooms" value={this.state.numberOfRooms} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>No. of People:</label>
                        <input type="number" name="numberOfPeople" value={this.state.numberOfPeople} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Book</button>
                </form>
                <button onClick={() => this.handleBookingList()}>Show Booked History</button>
            </div> : <BookingList></BookingList>
        );
    }
}

export default BookingPage;
