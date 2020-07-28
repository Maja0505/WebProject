package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Location;

public class LocationDAO {
	private Collection<Location> locations;
	private GenericCRUD<Location> genericCRUD = new GenericCRUD<Location>();
	
	public  LocationDAO() {
		
	}

	public LocationDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		locations = new LinkedList<Location>();
		List<Location> locationsArray = genericCRUD.load(contexPath, Location.class);
		for(Location location : locationsArray) {
				locationsArray.add(location);
		}
	}
	
	public void save(Collection<Location> allLocations,Location newLocation,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.saveAll(allLocations,path);
		locations.add(newLocation);
	}


	public Collection<Location> allLocations() {
		return locations;
	}
	

	public Collection<Location> getLocations() {
		return locations;
	}

	public void setLocations(Collection<Location> locations) {
		this.locations = locations;
	}

	public GenericCRUD<Location> getGenericCRUD() {
		return genericCRUD;
	}

	public void setGenericCRUD(GenericCRUD<Location> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}
}
