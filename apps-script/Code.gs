/**
 * Salt Landscaping — Careers Form Handler
 * Deployed as web app on hello@saltlandscaping.com.au
 * Receives POST from careers page, emails application to hello@saltlandscaping.com.au
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var name = data.name || 'Unknown';
    var phone = data.phone || '';
    var email = data.email || '';
    var location = data.location || '';
    var yearsLandscaping = data.years_landscaping || '';
    var yearsManaging = data.years_managing || '';
    var skills = data.skills || [];
    var softLandscaping = data.soft_landscaping || '';
    var certs = data.certs || [];
    var bestProject = data.best_project || '';
    var workplaceValues = data.workplace_values || '';
    var plant = data.plant || '';

    var subject = 'New Landscaper Application — ' + name;

    var html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">';
    html += '<div style="background: #4a5a40; color: white; padding: 24px 28px; border-radius: 4px 4px 0 0;">';
    html += '<h2 style="margin: 0; font-size: 18px;">New Landscaper Application</h2>';
    html += '<p style="margin: 4px 0 0; opacity: 0.8; font-size: 13px;">via Salt Landscaping Careers Page</p>';
    html += '</div>';

    html += '<div style="background: #faf8f4; border: 1px solid #ddd8d0; border-top: none; padding: 28px; border-radius: 0 0 4px 4px;">';

    // Contact
    html += sectionHeader('Contact Details');
    html += row('Name', name);
    html += row('Phone', '<a href="tel:' + phone + '">' + phone + '</a>');
    html += row('Email', '<a href="mailto:' + email + '">' + email + '</a>');
    if (location) html += row('Location', location);

    // Experience
    html += sectionHeader('Experience');
    html += row('Years in Landscaping', yearsLandscaping);
    if (yearsManaging) html += row('Years Managing Projects/Teams', yearsManaging);
    if (skills.length > 0) html += row('Hard Landscaping Skills', skills.join(', '));
    if (softLandscaping) html += row('Soft Landscaping', softLandscaping);

    // Certs
    if (certs.length > 0) {
      html += sectionHeader('Tickets & Certifications');
      html += '<p style="margin: 0; font-size: 14px; color: #1a1a18;">' + certs.join(' &bull; ') + '</p>';
    }

    // Best Project
    if (bestProject) {
      html += sectionHeader('Best Project');
      html += '<p style="margin: 0; font-size: 14px; color: #1a1a18; line-height: 1.6;">' + bestProject + '</p>';
    }

    // Workplace Values
    if (workplaceValues) {
      html += sectionHeader('What Matters Most in a Workplace');
      html += '<p style="margin: 0; font-size: 14px; color: #1a1a18; line-height: 1.6;">' + workplaceValues + '</p>';
    }

    // Plant
    if (plant) {
      html += sectionHeader('Underrated Plant Pick');
      html += '<p style="margin: 0; font-size: 14px; color: #1a1a18;">' + plant + '</p>';
    }

    html += '</div></div>';

    GmailApp.sendEmail('hello@saltlandscaping.com.au', subject,
      'New application from ' + name + ' (' + email + ', ' + phone + ')',
      { htmlBody: html, name: 'Salt Careers' }
    );

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sectionHeader(title) {
  return '<h3 style="margin: 24px 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #7a8c6e; border-bottom: 1px solid #ddd8d0; padding-bottom: 6px;">' + title + '</h3>';
}

function row(label, value) {
  return '<p style="margin: 0 0 8px; font-size: 14px;"><span style="color: #b8b0a2;">' + label + ':</span> <strong style="color: #1a1a18;">' + value + '</strong></p>';
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Salt Careers Form Handler' }))
    .setMimeType(ContentService.MimeType.JSON);
}
