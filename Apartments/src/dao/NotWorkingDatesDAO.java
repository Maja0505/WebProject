package dao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.NotWorkingDates;

public class NotWorkingDatesDAO {

	
	private Collection<NotWorkingDates> notWorkingDates;
	private GenericCRUD<NotWorkingDates> genericCRUD = new GenericCRUD<NotWorkingDates>();
	
	public NotWorkingDatesDAO() {
	}
	
	public NotWorkingDatesDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		notWorkingDates = new ArrayList<NotWorkingDates>();
		List<NotWorkingDates> notWorkingDatesArray = genericCRUD.load(contexPath, NotWorkingDates.class);
		for (NotWorkingDates nwd : notWorkingDatesArray) {
			notWorkingDates.add(nwd);
		}
	}
	
	public List<Date> getAllDates(){
		ArrayList<Date> allDates = new ArrayList<Date>();
		for (NotWorkingDates nwd : notWorkingDates) {
			allDates.addAll(nwd.getNotWorknigDates());
		}
		return allDates;
	}
	
	
	public Collection<NotWorkingDates> getNotWorkingDates() {
		return notWorkingDates;
	}
	public void setNotWorkingDates(Collection<NotWorkingDates> notWorkingDates) {
		this.notWorkingDates = notWorkingDates;
	}
	public GenericCRUD<NotWorkingDates> getGenericCRUD() {
		return genericCRUD;
	}
	public void setGenericCRUD(GenericCRUD<NotWorkingDates> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}
	
	
	
	
}
