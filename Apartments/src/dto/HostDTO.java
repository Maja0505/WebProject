package dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import beans.Apartment;

public class HostDTO {
	
	public String username;
	@JsonIgnoreProperties({"typeOfApartment","name","numberOfRooms","numberOfGuests","location","dateOfIssue","availabilityByDates","host","comments","images","pricePerNight","checkInTime","checkOutTime","statusOfApartment","amenities","reservations","flag"})
	public List<Apartment> apartmentsForRent;
	
	public HostDTO() {
		super();
	}
	
	public HostDTO(String username, List<Apartment> apartmentsForRent) {
		this.username = username;
		this.apartmentsForRent = apartmentsForRent;
	}
	
}
