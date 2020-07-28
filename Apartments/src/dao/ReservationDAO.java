package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Reservation;

public class ReservationDAO {

	private Collection<Reservation> reservations;
	private GenericCRUD<Reservation> genericCRUD = new GenericCRUD<Reservation>();
	
	public ReservationDAO() {
		
	}
	
	public ReservationDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		reservations = new LinkedList<Reservation>();
		List<Reservation> reservationArray = genericCRUD.load(contexPath, Reservation.class);
		for(Reservation a : reservationArray) {
			reservations.add(a);
		}
	}
	
	public Collection<Reservation> allReservations(){
		return reservations;
	}
	
	public void save(Collection<Reservation> allReservation,Reservation newReservation,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.saveAll(allReservation, path);
		reservations.add(newReservation);
	}
	
	public Collection<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(Collection<Reservation> reservations) {
		this.reservations = reservations;
	}
	public GenericCRUD<Reservation> getGenericCRUD() {
		return genericCRUD;
	}
	public void setGenericCRUD(GenericCRUD<Reservation> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}
}
