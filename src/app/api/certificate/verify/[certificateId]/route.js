import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";

export async function GET(req, { params }) {
  const { certificateId } = params;

  console.log("Fetching certificate with ID:", certificateId);

  try {
    await dbConnect();

    // ✅ Match the actual field names from the schema
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      console.log("Certificate not found");
      return new Response(JSON.stringify({ message: "Certificate not found" }), { status: 404 });
    }

    console.log("Certificate found:", certificate);

    return new Response(
      JSON.stringify({
        recipientName: certificate.recipientName,
        courseName: certificate.courseName,
        internshipType: certificate.internshipType,
        date: certificate.date,
        status: "Valid", // Example status value
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
