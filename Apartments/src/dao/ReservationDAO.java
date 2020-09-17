package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Reservation;

public class ReservationDAO {

	private HashMap<String,Reservation> reservations;
	private GenericCRUD<Reservation> genericCRUD = new GenericCRUD<Reservation>();
	
	public ReservationDAO() {
		
	}
	
	public ReservationDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		reservations = new HashMap<String, Reservation>();
		List<Reservation> reservationArray = genericCRUD.load(contexPath, Reservation.class);
		for(Reservation reservation : reservationArray) {
			reservations.put(reservation.getId(),reservation);
		}
	}
	
	public void save(Reservation newReservation,String path) throws JsonGenerationException, JsonMappingException, IOException {
		reservations.put(newReservation.getId(), newReservation);
		genericCRUD.saveAll(allReservations(), path);
		
	}
	
	public void update(Reservation newReservation,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.update(reservations, newReservation, path, newReservation.getId());
		reservations.replace(newReservation.getId(),reservations.get(newReservation.getId()), newReservation);
	}
	
	public Collection<Reservation> allReservations(){
		return reservations.values();
	}
	
	public HashMap<String, Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(HashMap<String, Reservation> reservations) {
		this.reservations = reservations;
	}

	public GenericCRUD<Reservation> getGenericCRUD() {
		return genericCRUD;
	}
	public void setGenericCRUD(GenericCRUD<Reservation> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}
}
