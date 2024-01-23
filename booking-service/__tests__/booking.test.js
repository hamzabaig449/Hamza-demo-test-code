const request = require('supertest');
const app = require('../app'); // Adjust the path based on your project structure

describe('Booking Service', () => {
    let createdBookingId;

    // Test case for creating a booking
    it('should create a new booking', async () => {
        const response = await request(app)
            .post('/booking')
            .send({
                userId: 'user123',
                hotelId: 'hotel456', 
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        createdBookingId = response.body._id;
    });

    

    // Test case for updating a booking
    it('should update a booking by ID', async () => {
        const response = await request(app)
            .put(`/booking/${createdBookingId}`)
            .send({
                userId: 'newUser123',
                hotelId: 'newHotel456',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('userId', 'newUser123');
        expect(response.body).toHaveProperty('hotelId', 'newHotel456');
    });

    // Test case for deleting a booking
    it('should delete a booking by ID', async () => {
        const response = await request(app).delete(`/booking/${createdBookingId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Booking deleted successfully');
    });
});
