package beans;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import enums.StatusOfReservation;

public class Reservation {

	private String id;
	@JsonIgnoreProperties({"typeOfApartment","numberOfRooms","numberOfGuests","location","dateOfIssue","availabilityByDates","host","comments","images","pricePerNight","checkInTime","checkOutTime","statusOfApartment","amenities","reservations"})
	private Apartment apartment;
	private Date startDateOfReservation;
	private int numberOfNights;
	private double fullPrice;
	private String reservationMessage;
    @JsonIgnoreProperties({"password","firstName","lastName","gender","typeOfUser","rentedApartments","reservations"})
	private Guest guest;
	private StatusOfReservation statusOfReservation;
	private int flag;
	
	public Reservation() {
		super();
	}

	public Reservation(String id,Apartment apartment,Date startDateOfReservation, int numberOfNights, double fullPrice, String reservationMessage,
			Guest guest, StatusOfReservation statusOfReservation) {
		super();
		this.id = id;
		this.apartment = apartment;
		this.startDateOfReservation = startDateOfReservation;
		this.numberOfNights = numberOfNights;
		this.fullPrice = fullPrice;
		this.reservationMessage = reservationMessage;
		this.guest = guest;
		this.statusOfReservation = statusOfReservation;
		this.flag = 0;
	}
	
	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public Date getStartDateOfReservation() {
		return startDateOfReservation;
	}

	public void setStartDateOfReservation(Date startDateOfReservation) {
		this.startDateOfReservation = startDateOfReservation;
	}

	public int getNumberOfNights() {
		return numberOfNights;
	}

	public void setNumberOfNights(int numberOfNights) {
		this.numberOfNights = numberOfNights;
	}

	public double getFullPrice() {
		return fullPrice;
	}

	public void setFullPrice(double fullPrice) {
		this.fullPrice = fullPrice;
	}

	public String getReservationMessage() {
		return reservationMessage;
	}

	public void setReservationMessage(String reservationMessage) {
		this.reservationMessage = reservationMessage;
	}

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public StatusOfReservation getStatusOfReservation() {
		return statusOfReservation;
	}

	public void setStatusOfReservation(StatusOfReservation statusOfReservation) {
		this.statusOfReservation = statusOfReservation;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}
	
	
	
}
