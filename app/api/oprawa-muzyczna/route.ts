import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for now (can be moved to Supabase later)
let musicData = {
  updatedAt: new Date().toISOString(),
  services: [
    {
      key: "studniowki",
      title: "Studniówki",
      description: "Elegancka oprawa muzyczna i prowadzenie wieczoru. Dobieramy repertuar dopasowany do gustu maturzystów i tradycji.",
      features: ["Repertuar taneczny i okoliczosciowy", "Profesjonalne prowadzenie imprezy", "Oswietlenie i efekty swietlne", "Wspolpraca z fotografem"]
    },
    {
      key: "wesela",
      title: "Wesela",
      description: "Kompleksowa oprawa muzyczna wesela - od pierwszego tancza po oczepiny. Dbamy o kazdy moment tego wyjatkowego dnia.",
      features: ["Konsultacja i dobór repertuaru", "Prowadzenie ceremonii i przyjecia", "Zabawy i konkursy weselne", "Sprzet naglosnieniowy i oswietlenie"]
    },
    {
      key: "urodziny",
      title: "Urodziny i przyjecia",
      description: "Muzyczna oprawa przyjec urodzinowych, rocznic i spotkan rodzinnych. Dopasujemy klimat do charakteru imprezy i gosci.",
      features: ["Rózne gatunki muzyczne", "Mozliwosc dedykacji i zyczen", "Naglosnienie dostosowane do sali", "Opcjonalnie animacje dla dzieci"]
    },
    {
      key: "firmowe",
      title: "Eventy firmowe",
      description: "Profesjonalna oprawa muzyczna na imprezy integracyjne, bankiety, gale i konferencje.",
      features: ["Muzyka tla i taneczna", "Prowadzenie programu", "Naglosnienie konferencji", "Oswietlenie sceniczne"]
    },
    {
      key: "bale",
      title: "Bale karnawaowe",
      description: "Dynamiczna oprawa muzyczna balów karnawaowych dla dzieci i doroslych. Wiele gatunków i klimatów w jednym wieczorze.",
      features: ["Repertuar taneczny i zabawowy", "Konkursy muzyczne z nagrodami", "Swiatla i efekty specjalne", "Wspolpraca z animatorami"]
    },
    {
      key: "swiateczne",
      title: "Eventy swiateczne",
      description: "Magiczna atmosfera swiat Bozego Narodzenia z odpowiednia oprawa muzyczna. Koledy, nowoczesne hity i klimatyczne aranacje.",
      features: ["Repertuar swiateczny", "Oswietlenie dekoracyjne", "Mozliwosc naglosnienia na zewnatrz", "Wspolpraca z Mikolajem"]
    }
  ]
};

export async function GET() {
  try {
    return NextResponse.json(musicData);
  } catch (error) {
    console.error('Music GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body || !body.services) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Update the in-memory data
    musicData = {
      ...body,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(musicData);
  } catch (error) {
    console.error('Music PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
