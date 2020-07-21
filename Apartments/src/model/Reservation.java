package model;

import java.util.Date;

import enums.StatusOfReservation;

public class Reservation {

	//dodati Apartman koji se rezervise njegove getere i setere i ubaciti ga u konstruktor
	private Date startDateOfReservation;
	private int numberOfNights;
	private double fullPrice;
	private String reservationMessage;
	private Guest guest;
	private StatusOfReservation statusOfReservation;
	
	public Reservation() {
	}

	public Reservation(Date startDateOfReservation, int numberOfNights, double fullPrice, String reservationMessage,
			Guest guest, StatusOfReservation statusOfReservation) {
		super();
		this.startDateOfReservation = startDateOfReservation;
		this.numberOfNights = numberOfNights;
		this.fullPrice = fullPrice;
		this.reservationMessage = reservationMessage;
		this.guest = guest;
		this.statusOfReservation = statusOfReservation;
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

	public String getreservationMessage() {
		return reservationMessage;
	}

	public void setreservationMessage(String reservationMessage) {
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
