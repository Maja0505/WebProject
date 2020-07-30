package beans;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import enums.Gender;
import enums.TypeOfUser;

public class Host extends User {
	
	@JsonIgnoreProperties({"typeOfApartment","numberOfRooms","numberOfGuests","location","dateOfIssue","availabilityByDates","host","comments","images","pricePerNight","checkInTime","checkOutTime","statusOfApartment","amenities","reservations"})
	private List<Apartment> apartmentsForRent;	
	
	public Host() {
		super();
	}
	
	public Host(String username, String password, String firstName, String lastName, Gender gender,
			TypeOfUser typeOfUser,List<Apartment> apartmentsForRent) {
		super(username,password,firstName,lastName,gender,typeOfUser);
		this.apartmentsForRent = apartmentsForRent;
	}

	public List<Apartment> getApartmentsForRent() {
		return apartmentsForRent;
	}

	public void setApartmentsForRent(List<Apartment> apartmentsForRent) {
		this.apartmentsForRent = apartmentsForRent;
	}
	
}
