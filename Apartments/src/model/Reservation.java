package model;

import java.util.Date;

import enums.StatusOfReservation;

public class Reservation {

	private Apartment apartment;
	private Date startDateOfReservation;
	private int numberOfNights;
	private double fullPrice;
	private String reservationMessage;
	private Guest guest;
	private StatusOfReservation statusOfReservation;
	
	public Reservation() {
	}

	public Reservation(Apartment apartment,Date startDateOfReservation, int numberOfNights, double fullPrice, String reservationMessage,
			Guest guest, StatusOfReservation statusOfReservation) {
		super();
		this.apartment = apartment;
		this.startDateOfReservation = startDateOfReservation;
		this.numberOfNights = numberOfNights;
		this.fullPrice = fullPrice;
		this.reservationMessage = reservationMessage;
		this.guest = guest;
		this.statusOfReservation = statusOfReservation;
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
	
	
	
}
