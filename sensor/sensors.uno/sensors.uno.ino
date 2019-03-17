#include <IRremote.h>
#include <Time.h>

const int RECV_PIN = 7;
const int SIGNAL_TO_RASPBERRY = 8;
const int TIME_OFFSET = 5000;
bool is_sent = false;

IRrecv irrecv(RECV_PIN);
decode_results results;
int last_available_signal_time = -1;

void setup(){
  Serial.begin(9600);
  pinMode(SIGNAL_TO_RASPBERRY, OUTPUT);
  irrecv.enableIRIn();
  irrecv.blink13(true);
}

void loop(){
  digitalWrite(SIGNAL_TO_RASPBERRY, LOW);

  int current_time = millis();

  if (is_sent){
    last_available_signal_time = -1;
    is_sent = false;
    digitalWrite(SIGNAL_TO_RASPBERRY, LOW);  
  }
  
  if (!is_sent && last_available_signal_time != -1 && current_time - last_available_signal_time > TIME_OFFSET){
    is_sent = true;
    digitalWrite(SIGNAL_TO_RASPBERRY, HIGH);
  }
  
  if (irrecv.decode(&results)){
    last_available_signal_time = millis();
    irrecv.resume();
  }
  delay(500);
}
