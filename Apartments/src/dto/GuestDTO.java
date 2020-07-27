package dto;

import java.util.List;

import beans.Apartment;
import beans.Reservation;

public class GuestDTO {

	public String username;
	public List<Apartment> apartments;
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
