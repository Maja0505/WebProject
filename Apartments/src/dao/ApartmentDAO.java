package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Apartment;

public class ApartmentDAO {

	private Collection<Apartment> apartments;
	private GenericCRUD<Apartment> genericCRUD = new GenericCRUD<Apartment>();
	
	public ApartmentDAO() {
	}

	public ApartmentDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		apartments = new LinkedList<Apartment>();
		List<Apartment> aparmtentsArray = genericCRUD.load(contexPath, Apartment.class);
		for(Apartment apartment : aparmtentsArray) {
			apartments.add(apartment);
		}
	}
	
	public void save(Collection<Apartment> allAparmtents,Apartment newAparmtnet,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.saveAll(allAparmtents,path);
		apartments.add(newAparmtnet);
	}
	
	public Collection<Apartment> allAparmtents() {
		return apartments;
	}
	
	
	public Collection<Apartment> getApartments() {
		return apartments;
	}

	public void setApartments (Collection<Apartment> apartments) {
		this.apartments = apartments;
	}

	public GenericCRUD<Apartment> getGenericCRUD() {
		return genericCRUD;
	}

	public void setGenericCRUD(GenericCRUD<Apartment> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}

	

}
