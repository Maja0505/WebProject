package dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import beans.Apartment;
import beans.Reservation;

public class GuestDTO {

	public String username;
	@JsonIgnoreProperties({"typeOfApartment","numberOfRooms","numberOfGuests","location","dateOfIssue","availabilityByDates","host","comments","images","pricePerNight","checkInTime","checkOutTime","statusOfApartment","amenities","reservations"})
	public List<Apartment> apartments;
	@JsonIgnoreProperties({"apartment","startDateOfReservation","numberOfNights","fullPrice","reservationMessage","guest","statusOfReservation"})
	public List<Reservation> reservations;
	
	
	
	public GuestDTO() {
		super();
	}



	public GuestDTO(String username, List<Apartment> rentedApartments, List<Reservation> reservations) {
		this.username = username;
		this.apartments = rentedApartments;
		this.reservations = reservations;
	}
}
