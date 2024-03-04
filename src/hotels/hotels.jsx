import React, { Component } from 'react';
import BookingPage from '../booking/bookingPage';
class HotelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [
                { id: 1, name: 'A', location: 'New York' },
                { id: 2, name: 'B', location: 'Paris' },
                { id: 3, name: 'C', location: 'London' },
                { id: 4, name: 'D', location: 'Tokyo' },
                { id: 5, name: 'E', location: 'Dubai' },
            ],
            filter: '',
            showBookingPage: false,
            hotelId: 0,
            hotelName: ""
        };

        this.handleBookingPage = this.handleBookingPage.bind(this);
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value });
    };

    handleBookingPage(hotelId, hotelName){
        this.setState({
            showBookingPage: true,
            hotelId: hotelId,
            hotelName: hotelName
        })
    }

    render() {
        const { hotels, filter } = this.state;

        const filteredHotels = filter
            ? hotels.filter(hotel => hotel.location.toLowerCase() === filter.toLowerCase())
            : hotels;

        const locations = [...new Set(hotels.map(hotel => hotel.location))];

        return (
             !this.state.showBookingPage ? <div>
                <h2>Hotel List</h2>
                <select value={filter} onChange={this.handleFilterChange}>
                    <option value="">All Locations</option>
                    {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
                <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Location</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHotels.map(hotel => (
                            <tr key={hotel.id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{hotel.name}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{hotel.location}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button
                                        onClick={() => this.handleBookingPage(hotel.id, hotel.name)}
                                    >
                                        Book
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : <BookingPage hotelId= {this.state.hotelId} hotelName={this.state.hotelName}></BookingPage>
        );
    }
}

export default HotelList;
