package beans;

import java.util.Date;
import java.util.List;

public class NotWorkingDates {

	private List<Date> notWorkingDates;

	public NotWorkingDates() {
	}

	public NotWorkingDates(List<Date> notWorkngDates) {
		this.notWorkingDates = notWorkngDates;
	}
	
	public List<Date> getNotWorkingDates() {
		return notWorkingDates;
	}

	public void setNotWorkingDates(List<Date> notWorkngDates) {
		this.notWorkingDates = notWorkngDates;
	}
}
