#!/bin/bash

# Constants
NUM_USERS=1
CANISTER_ID="bd3sg-teaaa-aaaaa-qaaba-cai"  
VENUE_CANISTER_ID="venue-canister-id"  
EVENT_CANISTER_ID="event-canister-id"  
WAHANA_CANISTER_ID="wahana-canister-id"

# Dummy data for venue creation
VENUE_TITLE="Sample Venue"
VENUE_CAPACITY=1000
VENUE_DESCRIPTION="This is a sample venue description."
VENUE_LOCATION="Sample Location"
VENUE_LOGO="{\"logo_type\" = \"url\"; \"data\" = \"https://example.com/logo.png\"}"  
VENUE_BANNER="{ \"logo_type\" = \"url\";  \"data\" = \"https://example.com/banner.png\"}"  
VENUE_COLLECTION_ARGS="{\"custodian\" = principal \"bd3sg-teaaa-aaaaa-qaaba-cai\"; \"collection_args\" =  record { \"logo\" = record $VENUE_LOGO ; \"banner\" = record $VENUE_BANNER ; \"description\" =  \"SAMPLE\"; \"created_at\" = 10 ; \"name\" = \"Sample Collection\"; \"symbol\" =  \"SYM\" ;\"maxLimit\" = 100; \"collection_type\" = variant { Venue }; \"sTicket_limit\" =  100; \"sTicket_price\" = 100000.0; \"vTicket_limit\" =  200; \"vTicket_price\" =  20000.0; \"gTicket_limit\" =  300; \"gTicket_price\" =   30000.0}}"

# Dummy data for event creation
EVENT_TITLE="Sample Event"
EVENT_DESCRIPTION="This is a sample event description."
EVENT_START_DATE="10"  
EVENT_START_TIME="10"  
EVENT_END_DATE="20"  
EVENT_END_TIME="20"  
EVENT_LOCATION="Sample Event Location"
EVENT_LOGO="{\"logo_type\": \"url\", \"data\": \"https://example.com/event_logo.png\"}" 
EVENT_BANNER="{\"logo_type\": \"url\", \"data\": \"https://example.com/event_banner.png\"}" 
EVENT_S_TICKET_LIMIT=100
EVENT_V_TICKET_LIMIT=200
EVENT_G_TICKET_LIMIT=300

# Dummy data for wahana creation
WAHANA_NAME="Sample Wahana"
WAHANA_SYMBOL="SWH"
WAHANA_DECIMALS=8
WAHANA_TOTAL_SUPPLY=1000
WAHANA_DESCRIPTION="This is a sample wahana description."
WAHANA_PRICE=10000.0 
WAHANA_FEATURED=true
WAHANA_BANNER="{\"logo_type\": \"url\", \"data\": \"https://example.com/wahana_banner.png\"}"  # Example wahana banner in Candid format

for ((i=1; i<=NUM_USERS; i++))
do
    IDENTITY_NAME="user_$i"
    dfx identity new "$IDENTITY_NAME" --disable-encryption &>/dev/null
    dfx identity use "$IDENTITY_NAME"

    echo "making admin $IDENTITY_NAME..."
    dfx identity use "default"
    add_RESULT=$(dfx canister call "$CANISTER_ID" addAdmins  \
        "(principal \"$(dfx identity get-principal --identity "$IDENTITY_NAME")\", \"email@example.com\", \"FirstName\", \"LastName\", variant { admin },  record { id = \"1\"; title = \"Venue A\" })" 2>&1)
    
    if [[ $? -eq 0 ]]; then
        echo "Venue created successfully for user $IDENTITY_NAME : $add_RESULT."
    else
        echo "Error creating venue for user $IDENTITY_NAME: $add_RESULT"
    fi

    dfx identity use "$IDENTITY_NAME"


    # 1. Create Venue
    echo "Creating venue for user $IDENTITY_NAME..."
    VENUE_RESULT=$(dfx canister call "$CANISTER_ID" createVenue \
        "(record  $VENUE_COLLECTION_ARGS, \"$VENUE_TITLE\", $VENUE_CAPACITY,record { \"Location\" =  \"$VENUE_LOCATION\"}, \"$VENUE_DESCRIPTION\")" 2>&1)
    
    if [[ $? -eq 0 ]]; then
        echo $VENUE_ID    
        echo "Venue created successfully for user $IDENTITY_NAME : $VENUE_RESULT."
    else
        echo "Error creating venue for user $IDENTITY_NAME: $VENUE_RESULT"
    fi


    # 2. Create Event
    echo "Creating event for user $IDENTITY_NAME..."
    EVENT_RESULT=$(dfx canister call "$CANISTER_ID" createEvent \
        "(\"ID\", record {\"id\" = \"id\" ; \"title\" = \"$EVENT_TITLE\"; \"description\" = \"$EVENT_DESCRIPTION\"; \"logo\" = record $VENUE_LOGO; \"banner\" =record $VENUE_BANNER; \"details\" = record {\"StartDate\" = $EVENT_START_DATE; \"StartTime\" = $EVENT_START_TIME; \"EndDate\" = $EVENT_END_DATE ; \"EndTime\" = $EVENT_END_TIME ; \"Location\" = \"$EVENT_LOCATION\"}; \"sTicket_limit\" = $EVENT_S_TICKET_LIMIT; \"vTicket_limit\" = $EVENT_V_TICKET_LIMIT ; \"gTicket_limit\" = $EVENT_G_TICKET_LIMIT ; \"creator\" = principal \"$(dfx identity get-principal)\" ; \"venueId\" = \"hey\"; \"status\" = variant {AboutToStart}}, record  $VENUE_COLLECTION_ARGS)" 2>&1)
    
    if [[ $? -eq 0 ]]; then
        echo "Event created successfully for user $IDENTITY_NAME."
    else
        echo "Error creating event for user $IDENTITY_NAME: $EVENT_RESULT"
    fi

    # 3. Create Wahana
    echo "Creating wahana for user $IDENTITY_NAME..."
    WAHANA_RESULT=$(dfx canister call "$CANISTER_ID" createWahana \
        "(\"$VENUE_CANISTER_ID\", \"$WAHANA_NAME\", \"$WAHANA_SYMBOL\", 10, 1000,\"$WAHANA_DESCRIPTION\" , true, record $VENUE_BANNER , 10000.0 )" 2>&1)
    
    if [[ $? -eq 0 ]]; then
        echo "Wahana created successfully for user $IDENTITY_NAME."
    else
        echo "Error creating wahana for user $IDENTITY_NAME: $WAHANA_RESULT"
    fi

    echo "topping up cycles..."
    dfx identity use "default"
    VENUE_RESULT=$(dfx canister deposit-cycles 810000000000 "$CANISTER_ID"  2>&1)
    
    if [[ $? -eq 0 ]]; then
        echo "Venue created successfully for user $IDENTITY_NAME : $VENUE_RESULT."
    else
        echo "Error creating venue for user $IDENTITY_NAME: $VENUE_RESULT"
    fi

done

# Switch back to default identity after the loop
dfx identity use default

echo "Created $NUM_USERS user records, venues, events, and wahanas."
